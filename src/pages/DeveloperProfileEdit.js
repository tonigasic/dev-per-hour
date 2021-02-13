import React, {useEffect, useState} from "react";
import '../assets/css/DeveloperProfileEdit.css'
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab";
import {countries} from '../Countries';
import RichTextEditor from "react-rte";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Avatar, Button, IconButton, InputAdornment} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import {getRequest, postRequest, putRequest} from "../Request";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Chip from "@material-ui/core/Chip";
import ReactS3 from 'react-s3';
import {awsConfig} from '../aswConfig';
import LoadingOverlay from 'react-loading-overlay';

function DeveloperProfileEdit () {
    const [freelancerExists, setFreelancerExists] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState({});
    const [aboutMe, setAboutMe] = useState('');
    const [price, setPrice] = useState(0);
    const [skills, setSkills] = useState([]);
    const [tempSkills, setTempSkills] = useState('');
    const [tempHobbys, setTempHobbys] = useState('');
    const [hobbys, setHobbys] = useState([]);
    const [picture, setPicture] = useState('');
    const [pictureObject, setPictureObject] = useState(null);
    const [pictureChanged, setPictureChanged] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const user = useSelector(selectUser);
    var pictureLocation = null;

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
            {label: 'Italic', style: 'ITALIC'},
            {label: 'Underline', style: 'UNDERLINE'},
            {label: 'Strikethrough', style: 'STRIKETHROUGH'}
        ],
        BLOCK_TYPE_BUTTONS: [
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'}
        ]
    };

    useEffect(()=> {
        if (user && user.isLoggedIn && user.user && user.user._id) {
            new Promise((resolve, reject) => {
                let path = '/freelancer/user/' + user.user._id;
                getRequest(path, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        let data = response.data;
                        let foundCountry = countries.filter(country => country.code === data.address.countryCode);
                        setCountry(foundCountry && foundCountry.length > 0 ? foundCountry[0] : []);
                        setId(data._id);
                        setName(data.name);
                        setProfession(data.profession);
                        setPhone(data.phone);
                        setCity(data.address.city);
                        setSkills(data.skills);
                        setHobbys(data.hobbys);
                        setPicture(data.picture);
                        setPrice(data.price);
                        setAboutMe(getRichTextValueParsed(data.about));
                        setFreelancerExists(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
        setOpenSuccessSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const getRichTextValueParsed = (value) => {
        return value ? RichTextEditor.createValueFromString(value, 'html') : RichTextEditor.createEmptyValue()
    };

    async function saveFreelancer() {
        setIsLoading(true);
        if (pictureChanged) {
            let pictureData = await uploadPicture();
            setPictureChanged(false);
            if (pictureData.success) {
                if (freelancerExists) {
                    updateFreelancer()
                }
                else {
                    createFreelancer();
                }
            }
            else {
                setErrorMessage(pictureData.error);
                setOpenSnackbar(true);
                if (freelancerExists) {
                    updateFreelancer()
                }
                else {
                    createFreelancer();
                }
            }
        }
        else {
            if (freelancerExists) {
                updateFreelancer()
            }
            else {
                createFreelancer();
            }
        }
    }

    function uploadPicture () {
        return new Promise(resolve => {
            ReactS3.uploadFile(pictureObject, awsConfig)
                .then( data => {
                    if (data && data.location) {
                        pictureLocation = data.location;
                        setPicture(data.location);
                        resolve({location: data.location, success: true});
                    }
                    else {
                        resolve({error: 'Picture could not be saved', success: false});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve({error: 'Picture could not be saved', success: false});
                })
        })
    };

    const handleChangePicture = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPictureChanged(true);
            setPictureObject(e.target.files[0]);
        }
    }

    const updateFreelancer = () => {
        if (validateRequest()) {
            let body = {
                name: name,
                profession: profession,
                phone: phone,
                address: {
                    city: city,
                    countryCode: country.code
                },
                about: aboutMe.toString('html'),
                skills: skills,
                hobbys: hobbys,
                picture: pictureLocation ? pictureLocation : picture,
                price: price
            };

            new Promise((resolve, reject) => {
                let path = '/freelancer/' + id;
                putRequest(path, body, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        setIsLoading(false);
                        setOpenSuccessSnackbar(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    }

    const createFreelancer = () => {
        if (validateRequest()) {
            let body = {
                userId: user.user._id,
                email: user.user.email,
                name: name,
                profession: profession,
                phone: phone,
                address: {
                    city: city,
                    countryCode: country.code
                },
                about: aboutMe.toString('html'),
                skills: skills,
                hobbys: hobbys,
                picture: pictureLocation ? pictureLocation : picture,
                rating: (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1),
                price:price
            };

            new Promise((resolve, reject) => {
                let path = '/freelancer';
                postRequest(path, body, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        setIsLoading(false);
                        setOpenSuccessSnackbar(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    }

    const deleteSkill = (index) => {
        let skillsClone = [...skills];
        skillsClone.splice(index, 1);
        setSkills(skillsClone);
    }

    const handleChangeSkill = (e) => {
        let value = e.target.value;
        setTempSkills(value);
    }

    const addSkill = () => {
        let skillsClone = [...skills];
        skillsClone.push(tempSkills);
        setSkills(skillsClone);
        setTempSkills('');
    }

    const handleKeyPress = (e, target) => {
        if (e.keyCode == 13) {
            target === 'skills' ? addSkill() : addHobby();
        }
    }

    const handleChangeHobby = (e) => {
        let value = e.target.value;
        setTempHobbys(value);
    }

    const addHobby = () => {
        let hobbysClone = [...hobbys];
        hobbysClone.push(tempHobbys);
        setHobbys(hobbysClone);
        setTempHobbys('');
    }

    const validateRequest = () => {
        if (name.trim() === '') {
            setErrorMessage('Please enter your name');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (profession.trim() === '') {
            setErrorMessage('Please enter your profession');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (city.trim() === '') {
            setErrorMessage('Please enter the city');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (!price || isNaN(price)) {
            setErrorMessage('Please enter the valid number');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (!country) {
            setErrorMessage('Please select one country');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        return true;
    }

    return (
        <div className="developerProfileEdit">
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Successfully saved data
                </Alert>
            </Snackbar>
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your content...'
            >
                <StyleRoot style={styles.fadeIn} className="developerProfileEdit__div">
                    <div className="developerProfileEdit__body">
                        <div>
                            <h1>Freelancer Profile</h1>
                        </div>
                        <div className="developerProfileEdit__inputs">
                            <div className="developerProfileEdit__avatar">
                                <Avatar
                                    src={picture ? picture : ''}
                                />
                            </div>
                            <div className="developerProfileEdit__fileInput">
                                <TextField
                                    label="Upload a new picture"
                                    InputLabelProps={{shrink: true}}
                                    variant="outlined"
                                    size="small"
                                    type="file"
                                    onChange={handleChangePicture}
                                    accept="image/*"
                                />
                            </div>
                            <div className="developerProfileEdit__inputsRole">
                                <TextField label="Name" variant="outlined" size="small" value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="developerProfileEdit__inputsRole">
                                <TextField label="Price" type="number" variant="outlined" size="small" value={price} onChange={e => setPrice(e.target.value)}/>
                            </div>
                            <div className="developerProfileEdit__inputsRole">
                                <TextField label="Profession" variant="outlined" size="small" value={profession} onChange={e => setProfession(e.target.value)} />
                            </div>
                            <div className="developerProfileEdit__inputsRole">
                                <TextField label="Phone" variant="outlined" size="small" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="developerProfileEdit__inputsRole">
                                <TextField label="City" variant="outlined" size="small" value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                            <div className="developerProfileEdit__inputsCountry">
                                <Autocomplete
                                    className="developerProfileEdit__countryAutocomplete"
                                    options={countries}
                                    value={country}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(e, newValue) => setCountry(newValue)}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Country"
                                            variant="outlined"
                                            size="small"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    }
                                />
                            </div>
                            <div className="developerProfileEdit__inputsChips">
                                <TextField
                                    className="developerProfileEdit__chipsInput"
                                    label="Skills"
                                    variant="outlined"
                                    size="small"
                                    value={tempSkills}
                                    onChange={handleChangeSkill}
                                    onKeyDown={e => handleKeyPress(e, 'skills')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={addSkill}><AddCircleOutlineIcon className="developerProfileEdit__inputIcon" /></IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                { skills && skills.length > 0 ?
                                    <div className="developerProfileEdit__chipsArray">
                                        {
                                            skills.map((skill, index) => {
                                                return <Chip color="primary" label={skill} key={index} onDelete={() => deleteSkill(index)} />
                                            })
                                        }
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="developerProfileEdit__inputsChips">
                                <TextField
                                    className={"developerProfileEdit__chipsInput"}
                                    label="Hobby's"
                                    variant="outlined"
                                    size="small"
                                    value={tempHobbys}
                                    onChange={handleChangeHobby}
                                    onKeyDown={e => handleKeyPress(e, 'hobbys')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={addHobby}><AddCircleOutlineIcon className="developerProfileEdit__inputIcon" /></IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                { hobbys && hobbys.length > 0?
                                    <div className="developerProfileEdit__chipsArray">
                                        {
                                            hobbys.map((hobby, index) => {
                                                return <Chip color="secondary" label={hobby} key={index} onDelete={() => console.log('asaaaa')} />
                                            })
                                        }
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="developerProfileEdit__textEditor">
                                <h3>About Me:</h3><br/>
                                <RichTextEditor
                                    editorClassName="textEditor"
                                    value={aboutMe || getRichTextValueParsed('')}
                                    onChange={setAboutMe}
                                    toolbarConfig={toolbarConfig}
                                />
                            </div>
                            <div className="developerProfileEdit__inputsRole">
                                <br/>
                                <br/>
                                <Button className="developerProfileEdit__saveButton" variant="contained" onClick={saveFreelancer}>Save</Button>
                            </div>
                        </div>
                    </div>
                </StyleRoot>
            </LoadingOverlay>
        </div>
    )
}

export default DeveloperProfileEdit;
import React, {useEffect, useState} from "react";
import '../assets/css/UserJobEdit.css'
import TextField from "@material-ui/core/TextField";
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {FormControl, IconButton, InputAdornment} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {getRequest, postRequest, putRequest} from "../Request";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Chip from "@material-ui/core/Chip";
import RichTextEditor from "react-rte";
import NoData from "../components/NoData";

function UserJobEdit () {
    const user = useSelector(selectUser);
    const [job, setJob] = useState({});
    const [renderJob, setRenderJob] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [durationType, setDurationType] = React.useState('day');
    const [tempSkills, setTempSkills] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const history = useHistory();
    const { id } = useParams();

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

    useEffect(() => {
        setRenderJob(false);
        setIsLoading(true);
        if (id && user.isLoggedIn) {
            setIsEdit(true);
            new Promise((resolve, reject) => {
                let path = '/job/' + id;
                getRequest(path, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        setDescription(getRichTextValueParsed(response.data.description || ''));
                        setJob(response.data);
                        setDurationType(response.data.duration_type);
                        setSkills(response.data.skills || []);
                        setIsLoading(false);
                        setRenderJob(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                    setIsLoading(false);
                })
        }
        else {
            setJob({});
            setDurationType('day');
            setTempSkills('');
            setSkills([]);
            setDescription(getRichTextValueParsed(''));
            setIsEdit(false);
            setTimeout(()=>{
                setIsLoading(false);
                setRenderJob(true);
            }, 500)
        }
    }, [id]);

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenSuccessSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleInputChange = (e, type) => {
        let jobClone = {...job};

        switch (type) {
            default:
                jobClone[type] = e.target.value;
        }
        setJob(jobClone);
    };

    const handleKeyPress = (e, target) => {
        if (e.keyCode == 13) {
            addSkill();
        }
    }

    const addSkill = () => {
        let skillsClone = [...skills];
        skillsClone.push(tempSkills);
        setSkills(skillsClone);
        setTempSkills('');
    }

    const deleteSkill = (index) => {
        let skillsClone = [...skills];
        skillsClone.splice(index, 1);
        setSkills(skillsClone);
    }

    const getRichTextValueParsed = (value) => {
        return value ? RichTextEditor.createValueFromString(value, 'html') : RichTextEditor.createEmptyValue()
    };

    const redirectBack = () => {
        history.push('/jobs/user');
    }

    const updateJob = () => {
        setIsLoading(true);
        let jobClone = {...job};
        jobClone.duration_type = durationType;
        jobClone.skills = skills;
        jobClone.description = description.toString('html');
        jobClone.price_low = jobClone.price_low || 0;
        jobClone.price_high = jobClone.price_high || 0;
        jobClone.hours_low = jobClone.hours_low || 0;
        jobClone.hours_high = jobClone.hours_high || 0;

        if (validateRequest(jobClone)) {
            new Promise((resolve, reject) => {
                let path = '/job/' + id;
                putRequest(path, jobClone, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        setJob(jobClone);
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

    const saveJob = () => {
        setIsLoading(true);
        let jobClone = {...job};
        console.log(jobClone)
        jobClone.durationType = durationType;
        jobClone.userId = user.user._id;
        jobClone.skills = skills;
        jobClone.description = description.toString('html');
        jobClone.priceLow = jobClone.price_low || 0;
        jobClone.priceHigh = jobClone.price_high || 0;
        jobClone.hoursLow = jobClone.hours_low || 0;
        jobClone.hoursHigh = jobClone.hours_high || 0;

        if (validateRequest(jobClone)) {
            new Promise((resolve, reject) => {
                let path = '/job';
                postRequest(path, jobClone, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        history.push('/jobs/user');
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

    const validateRequest = (body) => {
        if (!body) {
            setErrorMessage('Please fill the form');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (!body.title || body.title.trim() === '') {
            setErrorMessage('Please enter the title');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (!body.experience || body.experience.trim() === '') {
            setErrorMessage('Please enter the needed experience');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (parseInt(body.price_low) > parseInt(body.price_high)) {
            setErrorMessage('Min price can not be greater than max price');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (parseInt(body.hours_low) > parseInt(body.hours_high)) {
            setErrorMessage('Min hours per week can not be greater than max hours per week');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (!parseInt(body.duration) ||  parseInt(body.duration) === 0) {
            setErrorMessage('Duration of project can not be 0 or empty');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }

        return true;
    }

    return (
        <div className="userJobEdit">
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your content...'
            >
                    <StyleRoot style={styles.fadeIn} className="userJobEdit__div">

                        { renderJob ?
                        <div className="userJobEdit__body">
                            <div>
                                <h1>{isEdit ? "Edit Job" : "Create new job"}</h1>
                            </div>
                            <div className="userJobEdit__inputs">
                                <div className="userJobEdit__wideInput">
                                    <p>Title</p>
                                    <TextField variant="outlined" size="small" value={job.title} onChange={e => handleInputChange(e, 'title')} />
                                </div>
                                <div className="userJobEdit__wideInput">
                                    <p>Experience needed <small>(expert, rookie ...)</small></p>
                                    <TextField variant="outlined" size="small" value={job.experience} onChange={e => handleInputChange(e, 'experience')} />
                                </div>
                                <div className="userJobEdit__smallInputs">
                                    <div>
                                        <p>Min Price</p>
                                        <TextField type="number" variant="outlined" size="small" value={job.price_low} onChange={e => handleInputChange(e, 'price_low')} />
                                    </div>
                                    <div>
                                        <p>Max Price</p>
                                        <TextField type="number" variant="outlined" size="small" value={job.price_high} onChange={e => handleInputChange(e, 'price_high')} />
                                    </div>
                                </div>
                                <div className="userJobEdit__smallInputs">
                                    <div>
                                        <p>Min hours per week</p>
                                        <TextField type="number" variant="outlined" size="small" value={job.hours_low} onChange={e => handleInputChange(e, 'hours_low')} />
                                    </div>
                                    <div>
                                        <p>Max hours per week</p>
                                        <TextField type="number" variant="outlined" size="small" value={job.hours_high} onChange={e => handleInputChange(e, 'hours_high')} />
                                    </div>
                                </div>
                                <div className="userJobEdit__smallInputs">
                                    <div>
                                        <p>Duration</p>
                                        <TextField type="number" variant="outlined" size="small" value={job.duration} onChange={e => handleInputChange(e, 'duration')} />
                                    </div>
                                    <div>
                                        <p>Unit</p>
                                        <FormControl variant="outlined" className="userJobEdit__durationType">
                                            <Select
                                                className="userJobEdit__select"
                                                value={durationType}
                                                onChange={e => setDurationType(e.target.value)}
                                            >
                                                <MenuItem value={'day'}>Days</MenuItem>
                                                <MenuItem value={'week'}>Weeks</MenuItem>
                                                <MenuItem value={'month'}>Months</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="userJobEdit__inputsChips">
                                    <p>Skills</p>
                                    <TextField
                                        className="userJobEdit__chipsInput"
                                        variant="outlined"
                                        size="small"
                                        value={tempSkills}
                                        onChange={e => setTempSkills(e.target.value)}
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
                                        <div className="userJobEdit__chipsArray">
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
                                <div className="userJobEdit__textEditor">
                                    <h3>Description:</h3><br/>
                                    <RichTextEditor
                                        editorClassName="textEditor"
                                        value={description || getRichTextValueParsed('')}
                                        onChange={setDescription}
                                        toolbarConfig={toolbarConfig}
                                    />
                                </div>
                            </div>
                            <div className="userJobEdit__button">
                                <div>
                                    <button className="userJobEdit__saveButton" onClick={redirectBack}>Cancel</button>
                                </div>
                                <div>
                                    <button className="userJobEdit__saveButton" onClick={isEdit ? updateJob : saveJob}>Save</button>
                                </div>
                            </div>
                        </div>
                            :
                            <NoData/>
                        }
                    </StyleRoot>
            </LoadingOverlay>
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
        </div>
    )
}

export default UserJobEdit;
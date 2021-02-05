import React, {useEffect, useLayoutEffect, useState} from "react";
import '../assets/css/DeveloperProfileEdit.css'
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab";
import {countries} from './../Countries';
import RichTextEditor from "react-rte";

function DeveloperProfileEdit () {
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    useEffect(()=> {
        console.log(aboutMe.toString('html'))
    }, [aboutMe]);

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

    const getRichTextValueParsed = (value) => {
        return value ? RichTextEditor.createValueFromString(value, 'html') : RichTextEditor.createEmptyValue()
    };

    return (
        <div className="developerProfileEdit">
            <StyleRoot style={styles.fadeIn} className="developerProfileEdit__div">
                <div className="developerProfileEdit__body">
                    <div>
                        <h1>Freelancer Profile</h1>
                    </div>
                    <div className="developerProfileEdit__inputs">
                        <div className="developerProfileEdit__inputsRole">
                            <TextField label="Name" variant="outlined" size="small" value={name} />
                        </div>
                        <div className="developerProfileEdit__inputsRole">
                            <TextField label="Profession" variant="outlined" size="small" value={profession} />
                        </div>
                        <div className="developerProfileEdit__inputsRole">
                            <TextField label="Phone" variant="outlined" size="small" value={phone} />
                        </div>
                        <div className="developerProfileEdit__inputsRole">
                            <TextField label="City" variant="outlined" size="small" value={city} />
                        </div>
                        <div className="developerProfileEdit__inputsCountry">
                            <Autocomplete
                                className="developerProfileEdit__countryAutocomplete"
                                options={countries}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Country"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                }
                            />
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
                    </div>
                </div>
            </StyleRoot>
        </div>
    )
}

export default DeveloperProfileEdit;
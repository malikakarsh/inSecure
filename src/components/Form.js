import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Radio, Input, InputLabel, FormHelperText, OutlinedInput, makeStyles, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: 1,
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

function Form() {
    const ubuntuLogo = "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-ubuntu-logo.png";
    const centosLogo = "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-centos-logo.png?";
    const debianLogo = "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-debian-logo.png?";
    const fedoraLogo = "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-fedora-logo.png?";

    const imageTags = {
        ubuntu: ['20.10', '20.04', '18.04', '16.04', '14.04'],
        centos: ['7', '8', '8.3.2011', '7.9.2009', '8.2.2004'],
        fedora: ['33', '32', '35', '34', '31'],
        deiban: ['stretch-slim', 'stretch-backports', 'stretch-20210326', 'stretch', 'stable-slim']
    };

    const selectTags = [];

    const classes = useStyles();
    const [baseImage, setBaseImage] = useState('ubuntu');
    const [baseImageTag, setBaseImageTag] = useState(imageTags[baseImage][0]);

    const baseImageChange = (e, f) => {
        setBaseImage(f);
    }

    const baseImageTagChange = (e) => {
        setBaseImageTag(e.target.value);
    }

    imageTags[baseImage].map((e, i) => {
        selectTags.push(<MenuItem value={e}>{e}</MenuItem>);
    })

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <FormControl component="fieldset">
                    <FormLabel component="legend"><h1>Select Base Image</h1></FormLabel>
                    <ToggleButtonGroup value={baseImage} exclusive onChange={baseImageChange}>
                        <ToggleButton value="ubuntu">
                            <img src={ubuntuLogo} alt="ubuntu"></img>
                        </ToggleButton>
                        <ToggleButton value="centos">
                            <img src={centosLogo} alt="centos"></img>
                        </ToggleButton>
                        <ToggleButton value="fedora">
                            <img src={fedoraLogo} alt="fedora"></img>
                        </ToggleButton>
                        <ToggleButton value="debian">
                            <img src={debianLogo} alt="deiban"></img>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </FormControl>
                <FormControl variant="outlined" component="fieldset" fullWidth>
                    <FormLabel component="legend"><h1>Select Image Tag</h1></FormLabel>
                    <Select style={{ fontSize: 25 }} native>
                        {
                            selectTags
                        }
                    </Select>
                </FormControl>
            </form>
        </div >
    );
}

export default Form;
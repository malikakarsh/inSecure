import React, { useState, useEffect } from "react";
import {
	IconButton,
	FormControl,
	Grid,
	TextField,
	Select,
	makeStyles,
	FormLabel,
	Button,
	Input
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
const axios = require("axios");
const useStyles = makeStyles(() => ({
	root: {
		"& > *": {
			margin: 1
		},
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		minHeight: "100vh",
		flexDirection: "column",
		marginBottom: "50px"
	},
	form: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		margin: 15
	}
}));

function Form() {
	const ubuntuLogo =
		"https://d1q6f0aelx0por.cloudfront.net/product-logos/library-ubuntu-logo.png";
	const debianLogo =
		"https://d1q6f0aelx0por.cloudfront.net/product-logos/library-debian-logo.png?";

	const imageTags = {
		ubuntu: ["20.10", "20.04", "18.04", "16.04", "14.04"],
		debian: [
			"stretch-slim",
			"stretch-backports",
			"stretch-20210326",
			"stretch",
			"stable-slim"
		]
	};

	const selectTags = [];

	const classes = useStyles();
	const [portFields, setPortFields] = useState([]);
	const [baseImage, setBaseImage] = useState("ubuntu");
	const [baseImageTag, setBaseImageTag] = useState(imageTags[baseImage][0]);
	const [rootPassword, setRootPassword] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userName, setUsername] = useState("");
	const [hostName, setHostname] = useState("");
	const [containerName, setContainername] = useState("");
	const [exposedPorts, setExposedPorts] = useState([22]);
	const [mappedPorts, setMappedPorts] = useState([]);
	const [timeZone, setTimeZone] = useState("");
	const [banTime, setBantime] = useState(1800);
	const [maxRetry, setMaxretry] = useState(10);

	const baseImageChange = (e, f) => {
		setBaseImage(f);
	};

	const baseImageTagChange = e => {
		setBaseImageTag(e.target.value);
	};

	const addPortFields = () => {
		let fieldCount = portFields.length + 1;
		let newPortFields = [
			...portFields,
			<Grid item container id={fieldCount} key={fieldCount} spacing={1}>
				<Grid item xs={12} sm={5}>
					<TextField
						fullWidth
						id={"mapped" + fieldCount}
						label={"Mapped Port-" + fieldCount}
						variant="outlined"
						type="number"
						required={true}
					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<TextField
						fullWidth
						id={"exposed" + fieldCount}
						label={"Exposed Port-" + fieldCount}
						variant="outlined"
						type="number"
						required={true}
					/>
				</Grid>
				<IconButton id={fieldCount} onClick={removePortFields}>
					<RemoveCircle></RemoveCircle>
				</IconButton>
			</Grid>
		];

		setPortFields(newPortFields);
	};

	const removePortFields = (e, f) => {
		let removePortId = Number(e.target.id);
		if (Number.isInteger(removePortId) > 0) {
			let removePortFields = [...portFields];
			portFields.forEach((e, i) => {
				if (e.key === removePortId - 1) {
					removePortFields.splice(i, -1);
				}
			});
			setPortFields(removePortFields);
		}
	};

	imageTags[baseImage].map((e, i) => {
		selectTags.push(
			<option key={i} value={e}>
				{e}
			</option>
		);
	});

	const formData = {
		docker: {
			image: {
				name: baseImage,
				tag: baseImageTag
			},
			container: {
				base: baseImage,
				name: containerName,
				hostname: hostName,
				ports: {
					exposed: exposedPorts,
					mapped: mappedPorts
				}
			}
		},
		ssh: {
			timezone: timeZone,
			fail2ban: {
				bantime: banTime,
				maxretry: maxRetry
			},
			users: [
				{
					username: "root",
					password: rootPassword
				},
				{
					username: userName,
					password: userPassword
				}
			]
		}
	};
	console.log(formData);

	return (
		<div className={classes.root}>
			<form
				className={classes.form}
				onSubmit={e => {
					e.preventDefault();
					console.log({ formData });
					axios
						.post("/ssh", formData)
						.then(function (r) {
							console.log(r);
						})
						.catch(function (e) {
							console.log(e);
						});
				}}
			>
				<FormControl component="fieldset">
					<FormLabel component="legend">
						<h1>Select Base Image</h1>
					</FormLabel>
					<ToggleButtonGroup
						value={baseImage}
						exclusive
						onChange={baseImageChange}
					>
						<ToggleButton value="ubuntu">
							<img src={ubuntuLogo} alt="ubuntu"></img>
						</ToggleButton>
						<ToggleButton value="debian">
							<img src={debianLogo} alt="deiban"></img>
						</ToggleButton>
					</ToggleButtonGroup>
				</FormControl>
				<FormControl variant="outlined" component="fieldset" fullWidth>
					<FormLabel component="legend">
						<h2>Select Image Tag</h2>
					</FormLabel>
					<Select
						required={true}
						value={baseImageTag}
						onChange={baseImageTagChange}
						style={{ fontSize: 20 }}
						native
					>
						{selectTags}
					</Select>
				</FormControl>
				<FormControl variant="outlined" component="fieldset" fullWidth>
					<FormLabel component="legend">
						<h2>Credentials</h2>
					</FormLabel>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="username"
								label="Username"
								variant="outlined"
								onChange={e => setUsername(e.target.value)}
								required={true}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								id="root-password"
								label="Root Password"
								variant="outlined"
								onChange={e => setRootPassword(e.target.value)}
								required={true}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								id="user-password"
								label="User Password"
								variant="outlined"
								onChange={e => setUserPassword(e.target.value)}
								required={true}
							/>
						</Grid>
					</Grid>
				</FormControl>
				<FormControl variant="outlined" component="fieldset" fullWidth>
					<FormLabel component="legend">
						<h2>SSH Container</h2>
					</FormLabel>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								id="container-name"
								label="Container Name"
								variant="outlined"
								onChange={e => setContainername(e.target.value)}
								required={true}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								id="host-name"
								label="Host Name"
								variant="outlined"
								onChange={e => setHostname(e.target.value)}
								required={true}
							/>
						</Grid>
						<Grid item>
							<FormLabel component="legend">
								<h3 style={{ marginBottom: 0 }}> &gt; SSH Ports</h3>
							</FormLabel>
						</Grid>
						<Grid item container spacing={1} direction="column">
							<Grid item container spacing={1}>
								<Grid item xs={12} sm={5}>
									<TextField
										type="number"
										value={mappedPorts[0]}
										onChange={e => {
											let newMappedPorts = [...mappedPorts];
											newMappedPorts[0] = e.target.value;
											setMappedPorts(newMappedPorts);
										}}
										fullWidth
										id="mapped0"
										label="Mapped Port-0"
										variant="outlined"
										required={true}
									/>
								</Grid>
								<Grid item xs={12} sm={5}>
									<TextField
										type="number"
										value={exposedPorts[0]}
										fullWidth
										id="exposed0"
										variant="outlined"
										disabled
									/>
								</Grid>
								<IconButton>
									<AddCircle onClick={addPortFields}></AddCircle>
								</IconButton>
							</Grid>
							{portFields}
						</Grid>
						<Grid item>
							<FormLabel component="legend">
								<h3 style={{ marginBottom: 0 }}> &gt; Fail-to-Ban</h3>
							</FormLabel>
						</Grid>
						<Grid item container spacing={1}>
							<Grid item xs={12} sm={6}>
								<TextField
									value={maxRetry}
									fullWidth
									id="maxretry"
									variant="outlined"
									label="Max-Retry"
									required={true}
									onChange={e => setMaxretry(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									value={banTime}
									fullWidth
									id="bantime"
									variant="outlined"
									label="Ban-Time (in seconds)"
									onChange={e => setBantime(e.target.value)}
									required={true}
								/>
							</Grid>
						</Grid>
					</Grid>
				</FormControl>
				{/* <FormControl variant="outlined" component="fieldset" fullWidth>
					<FormLabel component="legend">
						<h2>Time-Zone</h2>
					</FormLabel>
					<Select style={{ fontSize: 25 }} native></Select>
				</FormControl> */}
				<Button
					fullWidth
					variant="contained"
					color="primary"
					type="submit"
					size="large"
					style={{ margin: 10 }}
				>
					Submit
				</Button>
			</form>
		</div>
	);
}

export default Form;

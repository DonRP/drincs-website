import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

function SignUp() {

    return (
        <>
            <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                margin="normal"
            />
            <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                margin="normal"
            />
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                margin="normal"
            />
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                margin="normal"
            />
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                    marginTop: 20,
                    marginBottom: 10,
                    marginLeft: 2,
                    marginRight: 2,
                }}
            >
                Sign Up
            </Button>
        </>
    );
}

export default SignUp;
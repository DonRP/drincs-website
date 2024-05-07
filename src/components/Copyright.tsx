import { Typography } from "@mui/joy";
import { gitHubLink } from "../values/constant";
import DRLink from "./DRLink";

function Copyright() {
    return (
        <Typography
            level="body-sm"
            sx={{ alignSelf: 'center' }}
        >
            {"Copyright © "}
            <DRLink
                to={gitHubLink + "/drincs-website"}
            >
                DRincs WebSite
            </DRLink>{" "}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default Copyright;
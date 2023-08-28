import { Link, Typography } from "@mui/joy";
import { gitHubLink } from "constant";

function Copyright() {
    return (
        <Typography
            level="body-sm"
            sx={{ alignSelf: 'center' }}
        >
            {"Copyright © "}
            <Link
                textColor={"text.secondary"}
                href={gitHubLink + "/drincs-website"}
            >
                DRincs WebSite
            </Link>{" "}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default Copyright;
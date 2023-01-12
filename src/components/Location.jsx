import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function Location(props) {

    const history = useHistory();

    const { location } = props;

    const MiCard = styled(Card)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));

    const handleClick = () => {
        console.log(history);

        // TODO: ARREGLAR ESTO!!!!!!!!!!!!!!!!!!
        window.location = `/Location/${Location.status.toLowerCase()}`;
        // history.push(`/characters/${character.status.toLowerCase()}`);
    };

    return (
        <Grid item key={Location.id} xs={12} sm={6} md={4} sx={{ p: '0px' }}>
            <MiCard className="miCard">
                <Grid item sx={{ pl: '1.5em' }}>
                    <div>
                        <Typography variant="h5" component="div" className="Typography">
                            {location.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            <span className="textoTarjeta">{location.residents}</span>
                        </Typography>
                            <div>
                                <small>Dimensión:</small>
                                <span>{location.dimension}</span>
                            </div>
                            <div>
                                <small>Type:</small>
                                <span>{location.type}</span>
                            </div>
                    </div>
                </Grid>
            </MiCard>
        </Grid>
    );
}

export default Location;
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function Episode(props) {

    const history = useHistory();
    const { episode } = props;


    const MiCard = styled(Card)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));

    return (
        // <Grid item key={Episode.id} xs={12} sm={6} md={4} sx={{ p: '0px' }}>
        <Grid item key={Episode.id} xs={12} sm={12} md={6} lg={6} xl={4} sx={{ p: 1 }} className='gridCards'>
            <MiCard className="miCard hoverable" onClick={() => history.push("/episodes/" + episode.id + "/")}>
                <Grid sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                    <div>
                        <Typography variant="h5" component="div" className="Typography">
                            {episode.name}
                        </Typography>
                        {/* <Typography variant="h5" component="div">
                            <span className="textoTarjeta">{episode.characters}</span>
                        </Typography> */}
                        <div className='pregunta'>
                            <small>Emitido:</small>
                            {/* <span>{episode.air_date}</span> */}
                            <span>{episode.air_date === "" ? "Unknown" : episode.air_date}</span>
                        </div>
                    </div>
                </Grid>
            </MiCard>
        </Grid>
    );
}

export default Episode;
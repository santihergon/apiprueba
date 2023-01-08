import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function Character(props) {
    //console.log('Estamos en character y recibimos');
    //console.log(props);

    const history = useHistory();

    const { character } = props;

    const MiCard = styled(Grid)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));

    const handleClick = () => {
        console.log(history);

        // TODO: ARREGLAR ESTO!!!!!!!!!!!!!!!!!!
        window.location = `/characters/${character.status.toLowerCase()}`;
        // history.push(`/characters/${character.status.toLowerCase()}`);
    };

    return (
        // Es el hijo del Grid Container
        <Grid item key={character.id} xs={12} sm={6} md={6} sx={{ p: 4 }} className='gridCards'>
            <MiCard container className="miCard"> {/* Este container para que sirve ??????????????????????????????????????????????????????????????????????????????? */}
                <Grid item xs={5}>
                    <img src={character.image} alt="characterCard__Img" className='characterCard__Img'  />
                </Grid>
                <Grid item xs sx={{ pl: '1.5em' }}>
                    <div>
                        <Typography variant="h5" component="div" className="Typography">
                            {character.name}
                        </Typography>
                        <span className="status">
                            <span className={"status__icon " + (character.status === "Alive" ? "vivo" : character.status === "Dead" ? "muerto" : "desconocido")} ></span>
                            <span className="characterStatus" onClick={handleClick}> {character.status}</span>
                            <span> - {character.species}</span>
                        </span>
                    </div>
                    <div>
                        <small>Última ubicación conocida:</small>
                        <span>{character.location.name}</span>
                    </div>
                    <div>
                        <span>Visto por primera vez:</span>
                        <span>{character.origin.name}</span>
                    </div>
                </Grid>
            </MiCard>
        </Grid>
    );
}

export default Character;
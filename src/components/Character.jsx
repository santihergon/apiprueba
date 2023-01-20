import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function Character(props) {
    //console.log('Estamos en character y recibimos');
    // console.log(props);

    const history = useHistory();

    const { character } = props; //Aqui saco character de props, es como que los deszipeo
    // console.log(character);

    const MiCard = styled(Grid)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));

    const handleClick = () => {
        console.log(history);

        // TODO: ARREGLAR ESTO!!!!!!!!!!!!!!!!!!
        window.location = `/characters/${character.status.toLowerCase()}/`; //Esto es un path parameter
        // history.push(`/characters/${character.status.toLowerCase()}`);
    };

    return (
        // Es el hijo del Grid Container
        <Grid item key={character.id} xs={12} sm={12} md={6} lg={6} xl={4} sx={{ p: 1 }} className='gridCards'>
            <MiCard container className="miCard" sx={{ m: 'auto' }}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <img src={character.image} alt="characterCard__Img" className='characterCard__Img' />
                </Grid>
                <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                    <div>
                        <Typography variant="h5" component="div" className="Typography">
                            {character.name}
                        </Typography>
                        <span className="status">
                            <span className={"status__icon " + (character.status === "Alive" ? "vivo" : character.status === "Dead" ? "muerto" : "desconocido")} ></span>
                            {/* <span className="characterStatus" onClick={handleClick}> {character.status}</span> */}
                            <span className={(character.status === "Alive" ? "characterStatusVivo" : character.status === "Dead" ? "characterStatusMuerto" : "characterStatusDesconocido")} onClick={handleClick}> {character.status}</span>
                            <span> - {character.species}</span>
                        </span>
                    </div>
                    <div className='pregunta'>
                        <small>Last known location:</small>
                        <span>{character.location.name}</span>
                    </div>
                    <div className='pregunta'>
                        <small>First seen in:</small>
                        <span>{character.origin.name}</span>
                    </div>
                </Grid>
            </MiCard>
        </Grid>
    );
}

export default Character;
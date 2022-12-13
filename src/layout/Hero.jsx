import RickandMorty from "../components/icons/RickandMortySvg";

function Hero() {
    return <section className="hero">
        <h1>The Rick and Morty API</h1>
        <RickandMorty
            style={{ fill: "#f5f5f5", width: "100%", height: "100%", position: 'absolute' }}
        />
    </section>
}
export default Hero;
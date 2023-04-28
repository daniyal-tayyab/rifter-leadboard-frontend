"use strict";
// console.log("Width : ", window.innerWidth);
// video methods on an off
function on() {
  document.getElementById("video").style.display = "block";
}

function off() {
  document.getElementById("video").style.display = "none";
  var iframe = document.getElementById("my-iframe");
  if (iframe) {
    var iframeSrc = iframe.src;
    iframe.src = iframeSrc;
  }
}

const table = document.querySelector(".table-conatiner");
// const leadboard = document.getElementById("leadboard");
const mainSection = document.querySelector(".main-section");

const options = document.querySelectorAll("input[name='leadboard_type']");

// main table component
function Table() {
  const [selected, setSelected] = React.useState("player");

  const handleChange = () => {
    let selected = document.querySelector(
      "input[name='leadboard_type']:checked"
    );
    setSelected(selected.value);
  };

  React.useEffect(() => {
    options.forEach((option) =>
      option.addEventListener("change", handleChange)
    );
  }, [selected]);

  React.useEffect(() => {
    if (selected === "dao") {
      mainSection.style.width = "90%";
    } else {
      mainSection.style.width = "65%";
    }
  }, [selected]);

  return <>{selected === "player" ? <PlayerBoard /> : <DaoBoard />}</>;
}

ReactDOM.render(<Table />, table);

// Player board component
function PlayerBoard() {
  const [players, setPlayers] = React.useState([]);
  const API_KEY =
    "AOAVly6wH+kNMN0tKJsRV5ecXv0xsAdfTxGEXs3Tr6LrI0XfOAgyxl/t3aHEg/+bkqLALob1Phd/c/KbQm0FoA==";

  const getPlayers = async () => {
    const response = await fetch("http://localhost:5000/api/player", {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const { data } = await response.json();
    setPlayers(data.sort((a, b) => b.kills - a.kills));
  };

  React.useEffect(() => {
    getPlayers();
  }, []);

  React.useEffect(() => {
    let interval = setInterval(async () => {
      getPlayers();
    }, [30000]);

    return () => clearInterval(interval);
  }, []);

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <td scope="col">Rank</td>
          <td scope="col">Character</td>
          <td scope="col">Class</td>
          <td scope="col">Dao</td>
          <td scope="col">Clan</td>
          <td scope="col">Kills</td>
        </tr>
      </thead>
      <tbody>
        {players &&
          players.map((player, index) => {
            const { id, rank, character, playerclass, dao, clan, kills } =
              player;
            return (
              <tr key={id}>
                <td scope="row">
                  {index + 1 === 1 && <img src="./images/number-one.png" />}#
                  {index + 1}
                </td>
                <td>
                  {character.charAt(0).toUpperCase() + character.slice(1)}
                </td>
                <td>
                  {playerclass.charAt(0).toUpperCase() + character.slice(1)}
                </td>
                <td>{dao.charAt(0).toUpperCase() + character.slice(1)}</td>
                <td>{clan.charAt(0).toUpperCase() + character.slice(1)}</td>
                <td>{kills}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

//Dao board component
function DaoBoard() {
  const [daos, setDaos] = React.useState([]);
  const API_KEY =
    "AOAVly6wH+kNMN0tKJsRV5ecXv0xsAdfTxGEXs3Tr6LrI0XfOAgyxl/t3aHEg/+bkqLALob1Phd/c/KbQm0FoA==";

  const getDaos = async () => {
    const response = await fetch("http://localhost:5000/api/dao", {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const { data } = await response.json();
    setDaos(data.sort((a, b) => a.rank - b.rank));
  };

  React.useEffect(() => {
    getDaos();
  }, []);

  React.useEffect(() => {
    let interval = setInterval(async () => {
      getDaos();
    }, [30000]);

    return () => clearInterval(interval);
  }, []);

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <td scope="col">RANK</td>
          <td scope="col">DAO</td>
          <td scope="col" style={{ textAlign: "center" }}>
            PVP VICTORIES
          </td>
          <td scope="col" style={{ textAlign: "center" }}>
            PVP SCORE
          </td>
          <td scope="col" style={{ textAlign: "center" }}>
            PVP DAMAGE
          </td>
          <td scope="col" style={{ textAlign: "center" }}>
            ACTIVE PLAYERS
          </td>
          <td scope="col" style={{ textAlign: "center" }}>
            DEAD PLAYERS
          </td>
          <td scope="col" style={{ textAlign: "center" }}>
            WARCHIEF LEVEL
          </td>
          <td scope="col">ATTRIBUTES</td>
          <td scope="col">BUY</td>
        </tr>
      </thead>
      <tbody>
        {daos &&
          daos.map((el) => {
            const {
              id,
              rank,
              dao,
              pvpVictories,
              pvpScore,
              pvpDamage,
              activePlayers,
              deadPlayers,
              warchiefLevel,
              attributes,
              eliminated,
            } = el;
            const att = Object.keys(attributes);
            const [att1, att2, att3, att4, att5] = att;
            return (
              <tr key={id}>
                <td scope="row" className={eliminated ? "eliminated" : ""}>
                  {rank === 1 && <img src="./images/number-one.png" />}#{rank}
                </td>
                <td className={eliminated ? "eliminated" : ""}>
                  <div className="el-flex">
                    {dao.charAt(0).toUpperCase() + dao.slice(1)}
                    {eliminated ? <Eliminated /> : <NotEliminated />}
                  </div>
                </td>
                <td
                  className={eliminated ? "eliminated" : ""}
                  style={{ textAlign: "center" }}
                >
                  {pvpVictories}
                </td>
                <td
                  className={eliminated ? "eliminated" : ""}
                  style={{ textAlign: "center" }}
                >
                  {pvpScore}
                </td>
                <td
                  className={eliminated ? "eliminated" : ""}
                  style={{ textAlign: "center" }}
                >
                  {pvpDamage}
                </td>
                <td
                  className={eliminated ? "eliminated" : ""}
                  style={{ textAlign: "center" }}
                >
                  {activePlayers}
                </td>
                <td
                  className={eliminated ? "eliminated" : ""}
                  style={{ textAlign: "center" }}
                >
                  {deadPlayers}
                </td>
                <td
                  className={eliminated ? "eliminated" : ""}
                  style={{ textAlign: "center" }}
                >
                  {warchiefLevel}
                </td>
                <td className={eliminated ? "eliminated" : ""}>
                  {`${att1}: ${attributes[att1]}, ${att2}: ${attributes[att2]}, ${att3}: ${attributes[att3]}, ${att4}: ${attributes[att4]}, ${att5}: ${attributes[att5]}`}
                </td>
                <td>
                  <BuyButton eliminated={eliminated} />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

function BuyButton({ eliminated }) {
  return (
    <button
      className="buy-button"
      disabled={eliminated}
      onClick={() => alert("click")}
    >
      <span>Buy Now</span>
      <img src="./images/arrow-backward-circle.png" alt="arrow backward" />
    </button>
  );
}

function Eliminated() {
  return <div className="eliminated-text">Eliminated</div>;
}

function NotEliminated() {
  return <div className="not-eliminated-text">Eliminated</div>;
}

//  {
//    dao.length < 15 && window.innerWidth >= 1440 && (
//      <span className="extra">extra word yo</span>
//    );
//  }

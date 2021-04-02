import {Circle} from 'better-react-spinkit'
function Loading() {
  return (
    <center style={{display: "flex",alignItems: "center",justifyContent: "center",height:"100vh"}}>
      <div>
        <img
          src="https://i.ibb.co/N9P0K9H/239px-Whats-App-svg.png"
          height={200}
          alt=""
          style={{ marginBottom: 10 }}
        />
        <Circle color="#3CBC28" height={60}/>
      </div>
    </center>
  );
}

export default Loading;



      <Countdown
        date={Date.now()+10000}
        intervalDelay={1000}
        precision={1000}
        renderer={(props) => <div>{parseInt(props.total/1000)}</div>}
        onComplete={()=>{console.log(1)}}
      />
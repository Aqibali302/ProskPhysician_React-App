import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/styles";
import Medicine from "./images/thankyou.png";
import GaugeChart from 'react-gauge-chart'
import PainPic from "./images/pain.jpg";
import PhysicalPic from "./images/physicial.jpg";
import DepressionPic from "./images/depression.jpg";
import HipPic from "./images/hip.jpg";
import KneePic from "./images/knee.jpg";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  List,
  Avatar,ListItemIcon,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import hipjoint from "./images/hip-joint.png";
import heart from "./images/heart.png";
import respiratorysystem from "./images/pr.png";
import gestrointestinal from "./images/gs.png";
import genitourinary  from "./images/gn.png";
import skeleton  from "./images/skeleton.png";
import neurological  from "./images/neurological.png";
import psychological  from "./images/psychological.png";
import head  from "./images/head.png";
import cancer  from "./images/cancer.png";
import organ  from "./images/organ.png";
import blood  from "./images/blood.png";
import insulin  from "./images/insulin.png";
import db  from "./images/db.png";
import bleeding  from "./images/bleeding.png";
import surgery  from "./images/surgery.png";
import tg  from "./images/tg.png";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import VideoChat from "./VideoChat";
import Button from "@material-ui/core/Button";
import Video from 'twilio-video';
import Participant from './Participant';
const useStyles = (theme) => ({
  downShift: {
    paddingTop: "18px !important",
  },
  textFieldCard: {
    paddingTop: "0px !important",
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  asdf: {
    margin: 1000,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
  },

  sectionDesktop: {
    display: "none",
  },
  sectionMobile: {
    display: "flex",
  },

  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  container: {
    marginTop: "100px",
  },
});

const Room = ({ roomName, token, handleLogout }) => {
  
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [pain, setpain] = useState([]);
  const [Physical_function, setPhysical_function] = useState([]);
  const [Depression, setDepression] = useState([]);
  const [Hip_Score, setHip_Score] = useState([]);
  const [Knee_Score, setKnee_Score] = useState([]);
  const [PhysicalFunctionGraph, setPhysicalFunctionGraph] = useState([]);
  const [DepressionGraph, setDepressionGraph] = useState([]);
  const [PainInterferenceGraph, setPainInterferenceGraph] = useState([]);
  const [anxietyGraph, setanxietyGraph] = useState([]);
  const [MedicalHistory, setMedicalHistory] = useState([]);
  const ServeyScoring =()=> {
    let url = localStorage.getItem("url") +"/MobileGetQuestionMarks?appointment_id=2061";
        fetch(url, {
          method: "GET",
          //body: data
        })
          .then(res => res.json())
          .then(
            (json) => {
              if (json.success === "1") {
                setpain(parseFloat("0."+json.pain_value));
                setPhysical_function(parseFloat("0."+json.Physical_string) );
                setDepression(parseFloat("0."+json.depression_string));
                setHip_Score(parseFloat("0."+json.hoos_value));
                setKnee_Score(parseFloat("0."+json.koos_string));
                
           
              }
              else {
                alert(json.SYSTEM_MESSAGE)
              }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            }
          )
      }
      const GetSurveryScore =()=> {
        let url = localStorage.getItem("url") +"/MobileGetDoneSurveys?appointment_id=2061";
            fetch(url, {
              method: "GET",
              //body: data
            })
              .then(res => res.json())
              .then(
                (json) => {
                  console.log(url);
                  console.log(json);
                  if (json.success === "1") {
                   let PhysicalFunction=JSON.parse(json.PhysicalFunction);
                   let Depression=JSON.parse(json.Depression);
                   let PainInterference=JSON.parse(json.PainInterference);
                   let anxiety=JSON.parse(json.anxiety);
                   setMedicalHistory(json.medical_history_data);
                   console.log(MedicalHistory);
                    setPhysicalFunctionGraph({
                      chart:{
                        type:'spline'
                      },
                        title: {
                            text: ' '
                        },
                     yAxis: {
                            title: {
                                text: 'Physical Function Score'
                            }
                        },
                     xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: { // don't display the dummy year
                                day: '%b - %y'
                                
                            },
                            title: {
                                text: 'Date'
                            }
                        },
                        legend: {
                           enabled:false
                        },
                  
                        
                        plotOptions: {
                            spline: {
                                marker: {
                                    enable: false
                                },
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                      series: [{name:'Score',
                        data: PhysicalFunction,
                        type: 'spline',
                        tooltip: {
                            valueDecimals: 2
                        }
                      }]
                    });

                    setDepressionGraph({
                      chart:{
                        type:'spline'
                      },
                        title: {
                            text: ' '
                        },
                     yAxis: {
                            title: {
                                text: 'Depression Score'
                            }
                        },
                     xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: { // don't display the dummy year
                                day: '%b - %y'
                                
                            },
                            title: {
                                text: 'Date'
                            }
                        },
                        legend: {
                           enabled:false
                        },
                  
                        
                        plotOptions: {
                            spline: {
                                marker: {
                                    enable: false
                                },
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                      series: [{name:'Score',
                        data: Depression,
                        type: 'spline',
                        tooltip: {
                            valueDecimals: 2
                        }
                      }]
                    });

                    setPainInterferenceGraph({
                      chart:{
                        type:'spline'
                      },
                        title: {
                            text: ' '
                        },
                     yAxis: {
                            title: {
                                text: 'Pain Interference Score'
                            }
                        },
                     xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: { // don't display the dummy year
                                day: '%b - %y'
                                
                            },
                            title: {
                                text: 'Date'
                            }
                        },
                        legend: {
                           enabled:false
                        },
                  
                        
                        plotOptions: {
                            spline: {
                                marker: {
                                    enable: false
                                },
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                      series: [{name:'Score',
                        data: PainInterference,
                        type: 'spline',
                        tooltip: {
                            valueDecimals: 2
                        }
                      }]
                    });

                    setanxietyGraph({
                      chart:{
                        type:'spline'
                      },
                        title: {
                            text: ' '
                        },
                     yAxis: {
                            title: {
                                text: 'Anxiety Score'
                            }
                        },
                     xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: { // don't display the dummy year
                                day: '%b - %y'
                                
                            },
                            title: {
                                text: 'Date'
                            }
                        },
                        legend: {
                           enabled:false
                        },
                  
                        
                        plotOptions: {
                            spline: {
                                marker: {
                                    enable: false
                                },
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                      series: [{name:'Score',
                        data: anxiety,
                        type: 'spline',
                        tooltip: {
                            valueDecimals: 2
                        }
                      }]
                    });
                    
                    
                  }
                  else {
                    alert(json.SYSTEM_MESSAGE)
                  }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
              )
          }
  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

   ServeyScoring();
   GetSurveryScore();
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });
    
    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));
  
    

  return (
    <div className="room" >
      {/* {<h2>Room: {roomName}</h2>    } */}
      <Grid container spacing={8} style={{marginBottom:"20px"}}>
      
          <Grid item xs={12} sm={1}>
        </Grid>
          <Grid item xs={12} sm={2}>
          <center><Typography  variant="title"  style={{fontSize:"26px"}}>
          Pain Interface
                </Typography></center>
          
        
          </Grid>
          <Grid item xs={12} sm={2}>
          <center> <Typography  variant="title"    style={{fontSize:"26px"}}>
          Physical Function
                </Typography></center>
          
          </Grid>
          <Grid item xs={12} sm={2}>
          <center><Typography  variant="title"    style={{fontSize:"26px"}}>
          Depression
                </Typography></center>
         
          </Grid>
          <Grid item xs={12} sm={2}>
          <center><Typography  variant="title"    style={{fontSize:"26px"}}>
          Hip Score
                </Typography>
                </center>
         
          </Grid>
          <Grid item xs={12} sm={2}>
          <center> <Typography  variant="title"    style={{fontSize:"26px"}}>
          Knee Score
                </Typography>  </center>
        
        </Grid>
          <Grid item xs={12} sm={1}>
          </Grid>

        <Grid item xs={12} sm={1}>
        </Grid>       
        <Grid item xs={12} sm={2}>
        
        <GaugeChart id="gauge-chart11" 
                  textColor={"black"}
  nrOfLevels={400}
  arcsLength={[0.2, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
  
  percent={pain}
  arcPadding={0.03}
  style={{marginTop:"-50px"}}
/>
          </Grid>
        <Grid item xs={12} sm={2}>
         
          <GaugeChart id="gauge-chart10" 
                  textColor={"black"}
  nrOfLevels={500}
  arcsLength={[0.2, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
 
  percent={Physical_function}
  arcPadding={0.03}
  style={{marginTop:"-50px"}}
/>
          </Grid>
        <Grid item xs={12} sm={2}>
         
          <GaugeChart id="gauge-chart9" 
                  textColor={"black"}
  nrOfLevels={200}
  arcsLength={[0.2, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
 
  percent={Depression}
  arcPadding={0.03}
  style={{marginTop:"-50px"}}
/>
          </Grid>
        <Grid item xs={12} sm={2}>
        
          <GaugeChart id="gauge-chart8" 
                  textColor={"black"}
  nrOfLevels={700}
  arcsLength={[0.2, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
 
  percent={Hip_Score}
  arcPadding={0.03}
  style={{marginTop:"-50px"}}
/>
          </Grid>
        <Grid item xs={12} sm={2}>
         
        <GaugeChart id="gauge-chart5" 
                  textColor={"black"}
  nrOfLevels={700}
  arcsLength={[0.2, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
   percent={Knee_Score}
  arcPadding={0.03}
  style={{marginTop:"-50px"}}
/>
</Grid> 
        <Grid item xs={12} sm={1}  > 
</Grid>
        
        
          <Grid item xs={12} sm={1}  > 
          </Grid>
          <Grid item xs={12} sm={10} > 
          <Card style={{ boxShadow:"0px 4px 8px 0px",height:"100%",
                        color:'black',
                        width:"100%",}}>
        <Grid container>
         
          
        <Grid item xs={12} sm={9} style={{height:"220px !important"}} >  
        <Card style={{backgroundColor:"teal"}}>
                <ListItem
            style={{
              padding: "0px",
            }}
        >
          <ListItemText>
            <CardHeader
              title={
                <Typography
                  style={{
                    fontSize: "16px",
                    fontFamily: "initial",
                    color:"white"
                  }}
                >
               James Smith | Male | 36 Years
                </Typography>
              }
             
            />
            
          </ListItemText>
        </ListItem>
                </Card>
            <div style={{height:"250px !important"}} >{remoteParticipants}</div></Grid>
            <Grid item xs={12} sm={3}  >
        <Card style={{backgroundColor:"teal"}}>
          <ListItem
          style={{
            padding: "0px",
          }}
        >
          <ListItemText>
            <CardHeader
              title={
                <Typography
                  style={{
                    fontSize: "16px",
                    fontFamily: "initial",
                    color:"white"
                  }}
                >
                     Medical History
                </Typography>
              }
            />
          </ListItemText>
        </ListItem>
        </Card>
        <List style={{width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,}}>
        {MedicalHistory.map((ItemLists, idx) => (
          
          <React.Fragment key={idx}>

      <Card
        style={{
          margin: "0%",
          color:'white',
          backgroundColor:ItemLists.backgroundColor
        }}
      >
        <ListItem
          button
        >
          <ListItemText secondary={ItemLists.answer} >
                <Typography
                  style={{
                    fontSize: "22px",
                    color:"black"
                  }}
                >
                {ItemLists.question}
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card>
<Divider  color="teal"/>
      </React.Fragment>
        ))}
     
      </List>
</Grid>
      
      <Grid item xs={12} sm={1}  > 
          </Grid>
  
          </Grid>
          
          <Grid item xs={12} sm={12}  >



<Card style={{backgroundColor:"teal"}}>

<ListItem
            style={{
              padding: "0px",
            }}
        >
          <ListItemText>
            <CardHeader
              title={
                <Typography
                  style={{
                    fontSize: "16px",
                    fontFamily: "initial",
                    color:"white"
                  }}
                >
                  Review of Systems
                </Typography>
              }
             
            />
            
          </ListItemText>
        </ListItem>
</Card>
<Grid container>
<Grid item xs={12} sm={3}  ><Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#ff726f"
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={heart}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                HEART AND CIRCULATORY 
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> </Grid>
<Grid item xs={12} sm={3}  ><Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={respiratorysystem}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                RESPIRATORY SYSTEM
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> </Grid>
<Grid item xs={12} sm={3}  >
<Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={gestrointestinal}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                GASTRO INTESTINAL 
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> </Grid>
<Grid item xs={12} sm={3}  ><Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={genitourinary}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                GENITOURINARY SYSTEM
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> </Grid>
      </Grid>

      <Grid container>
      <Grid item xs={12} sm={3}  > 
      <Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={head}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                Head, Eyes, Ears, Nose ?
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card>
      </Grid>
<Grid item xs={12} sm={3}  >
<Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={psychological}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                PSYCHOLOGICAL SYSTEM
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> </Grid>
<Grid item xs={12} sm={3}  >
<Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={neurological}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                NEOROLOGICAL SYSTEM
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> </Grid>
<Grid item xs={12} sm={3}  >
<Card
        style={{
          margin: "10px",
          color:'white',
          backgroundColor:"#F2F2F2",
        }}
      >
        <ListItem
          button
        >
        <ListItemIcon>
        <Avatar
              src={skeleton}
            />
      </ListItemIcon>
          <ListItemText>
                <Typography
                  style={{
                    fontSize: "16px",
                    color:"black"
                  }}
                >
                MUSCULOSKELETAL SYSTEM
                </Typography>
            
          </ListItemText>
        </ListItem>
      </Card> 
      </Grid>
      </Grid>


      </Grid>

</Card></Grid>
          <Grid item xs={12} sm={1}>
            </Grid>
          
          
          <Grid item xs={12} sm={1}>
          </Grid> 
          <Grid item xs={12} sm={2}> 
          <center><Typography  variant="title"  style={{fontSize:"26px"}}>
          Physical Functions
                </Typography>
                <br></br>
          {/* <img src={PhysicalPic} style={{height:"250px"}}/>*/}
          <HighchartsReact
    highcharts={Highcharts}
    options={PhysicalFunctionGraph}
  /></center> 
          </Grid>
          <Grid item xs={12} sm={2}> 
          <center><Typography  variant="title"  style={{fontSize:"26px"}}>
          Depression Symptoms
                </Typography>
                <br></br>
                <HighchartsReact
    highcharts={Highcharts}
    options={DepressionGraph}
  /></center>
          </Grid>
          <Grid item xs={12} sm={2}> 
          <center><Typography  variant="title"  style={{fontSize:"26px"}}>
          Pain Interference
                </Typography>
                <br></br>
                <HighchartsReact
    highcharts={Highcharts}
    options={PainInterferenceGraph}
  /></center>
          </Grid>
          <Grid item xs={12} sm={2}>
            <center><Typography  variant="title"  style={{fontSize:"26px"}}>
            General Anxiety
                </Typography>
                <br></br>
                <HighchartsReact
    highcharts={Highcharts}
    options={anxietyGraph}
  /></center>
          </Grid>
          <Grid item xs={12} sm={2}>  
          <center><Typography  variant="title" style={{fontSize:"26px"}}>
          Self View
                </Typography>
                <br></br>
          <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </div>
    
      </center>
          </Grid>
          <Grid item xs={12} sm={1}>
      </Grid>
      </Grid>
      <AppBar
          position="fixed"
          style={{ top: "auto", bottom: 0 }}
          color="default"
        >
          <Toolbar variant="dense">
            <div className="grow" style={{flexGrow: 1}} />
            <Button type="submit" variant="contained" style={{backgroundColor:"red",color:"white"}}
              onClick={handleLogout}
            >
              Leave Meeting
              </Button>
          </Toolbar>
        </AppBar>
    </div>
  );
};

export default withStyles(useStyles)(Room);

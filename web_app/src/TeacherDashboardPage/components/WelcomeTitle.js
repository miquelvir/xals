import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from "react-i18next";
import {textSchedulesForCourse} from "../../utils/localized-weekdays";
import Box from "@material-ui/core/Box";
import {userContext} from "../../_context/user-context";

const useStyles = makeStyles((theme) => ({
  welcomeMessage: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
}
}));

export default function WelcomeTitle({course}) {
  const classes = useStyles();
  const userCtx = React.useContext(userContext);
  const {t} = useTranslation();

  const hi = "😄";
  const hiii = "🥰";
  const [welcomeEmoji, setWelcomeEmoji] = useState(hi);
  const switchWelcomeEmoji = () => {
      setWelcomeEmoji(welcomeEmoji == hi? hiii: hi);
  }
  return (
    <Box p={4}
      display="flex"
      justifyContent="center"
      alignItems="center">
          <Typography variant="h4" className={classes.welcomeMessage}>
              {t("hi")} {userCtx.teacher === undefined? '': userCtx.teacher.name} 
          </Typography>
          <Typography variant="h4" className={classes.welcomeMessage} onClick={switchWelcomeEmoji} onMouseOver={() => setWelcomeEmoji(hiii)} onMouseOut={() => setWelcomeEmoji(hi)}>
              {welcomeEmoji}
          </Typography>
      </Box>
  );
}
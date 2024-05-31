import { useReducer } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Translate from '@components/Translate';
import LabelSwitch from '@components/LabelSwitch';
import { isNumeric } from '@utils/number';
import { ACTIONS } from './actions';
import { matchReducer } from './reducers';
import EntryInput from './components/EntryInput';
import { useTranslation } from 'react-i18next';

export default function MatchForm({ match, teams, endDate, addMatch, updateMatch }) {
  const [state, dispatch] = useReducer(matchReducer, match);
  const { homeTeam, awayTeam, homeScore, awayScore, isNeutralVenue, isWorldCup, isComplete } = state;
  const { t } = useTranslation();

  const onHomeTeamChange = (e, homeTeam) => dispatch({
    type: ACTIONS.CHANGE_HOME_TEAM,
    payload: { homeTeam },
  });

  const onAwayTeamChange = (e, awayTeam) => dispatch({
    type: ACTIONS.CHANGE_AWAY_TEAM,
    payload: { awayTeam },
  });

  const onHomeScoreChange = e => {
    const value = e.target.value;
    const homeScore = isNumeric(value) ? parseInt(value, 10) : null;

    dispatch({ type: ACTIONS.CHANGE_HOME_SCORE, payload: { homeScore } });
  };

  const onAwayScoreChange = e => {
    const value = e.target.value;
    const awayScore = isNumeric(value) ? parseInt(value, 10) : null;

    dispatch({ type: ACTIONS.CHANGE_AWAY_SCORE, payload: { awayScore } });
  };

  const onNeutralVenueChange = (e, isNeutralVenue) => dispatch({
    type: ACTIONS.CHANGE_IS_NEUTRAL_VENUE,
    payload: { isNeutralVenue },
  });

  const onWorldCupChange = (e, isWorldCup) => dispatch({
    type: ACTIONS.CHANGE_IS_WORLD_CUP,
    payload: { isWorldCup },
  });

  const onClickConfirm = match => {
    if (match.matchId) {
      updateMatch({ ...match, isCreated: true });
    } else {
      const competition = t('app.main.matches.created');
      const country = isNeutralVenue ? t('app.main.matches.neutral') : homeTeam?.name;
      const time = { millis: endDate };
      addMatch({ ...match, time, competition, venue: { country }, isCreated: true });
    }
  };

  return (
    <Stack direction="column">
      <EntryInput
        team={homeTeam}
        score={homeScore}
        otherTeam={awayTeam}
        teams={teams}
        onTeamChange={onHomeTeamChange}
        onScoreChange={onHomeScoreChange}
        label={
          <Translate text={isNeutralVenue ? 'app.main.modal.team' : 'app.main.modal.home'} />
        }
      />

      <EntryInput
        team={awayTeam}
        score={awayScore}
        otherTeam={homeTeam}
        teams={teams}
        onTeamChange={onAwayTeamChange}
        onScoreChange={onAwayScoreChange}
        label={
          <Translate text={isNeutralVenue ? 'app.main.modal.team' : 'app.main.modal.away'} />
        }
      />

      <Stack
        direction={{ xs: 'column', sm: 'row'}}
        alignItems="flex-end"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 1 }}
      >
        <Stack direction="row">
          <LabelSwitch
            label={<Translate text="app.main.modal.neutral" />}
            onChange={onNeutralVenueChange}
            checked={isNeutralVenue}
          />
          <LabelSwitch
            label={<Translate text="app.main.modal.rwc" />}
            onChange={onWorldCupChange}
            checked={isWorldCup}
          />
        </Stack>

        <Button
          variant="contained"
          disabled={!isComplete}
          startIcon={<SendIcon />}
          onClick={() => onClickConfirm(state)}
        >
          <Translate text="app.main.modal.confirm" />
        </Button>
      </Stack>
    </Stack>
  );
}

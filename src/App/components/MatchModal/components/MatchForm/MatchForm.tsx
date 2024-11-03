import { useReducer, SyntheticEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Translate from '@components/Translate';
import LabelSwitch from '@components/LabelSwitch';
import { NEW_MATCH, TODAY } from '@constants/defaults';
import { ACTIONS } from './actions';
import { matchReducer } from './reducers';
import EntryInput from './components/EntryInput';
import type { AppMatch, Team } from '@constants/types';

type Props = {
  match?: AppMatch | null;
  teams: Array<Team>;
  endDate?: Date;
  addMatch: (match: AppMatch) => void;
  updateMatch: (match: AppMatch) => void;
};

export default function MatchForm({
  match,
  endDate = TODAY,
  teams,
  addMatch,
  updateMatch,
}: Props) {
  const [state, dispatch] = useReducer(matchReducer, match ?? NEW_MATCH);
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isNeutralVenue,
    isWorldCup,
    isComplete,
  } = state;
  const { t } = useTranslation();

  const onHomeTeamChange = (_e: SyntheticEvent, team: Team | null) =>
    dispatch({
      type: ACTIONS.CHANGE_HOME_TEAM,
      payload: { team },
    });

  const onAwayTeamChange = (_e: SyntheticEvent, team: Team | null) =>
    dispatch({
      type: ACTIONS.CHANGE_AWAY_TEAM,
      payload: { team },
    });

  const onHomeScoreChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: ACTIONS.CHANGE_HOME_SCORE,
      payload: { score: parseInt(e.target.value, 10) },
    });

  const onAwayScoreChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: ACTIONS.CHANGE_AWAY_SCORE,
      payload: { score: parseInt(e.target.value, 10) },
    });

  const onNeutralVenueChange = (_e: SyntheticEvent, isSelected: boolean) =>
    dispatch({
      type: ACTIONS.CHANGE_IS_NEUTRAL_VENUE,
      payload: { isSelected },
    });

  const onWorldCupChange = (_e: SyntheticEvent, isSelected: boolean) =>
    dispatch({
      type: ACTIONS.CHANGE_IS_WORLD_CUP,
      payload: { isSelected },
    });

  const onClickConfirm = (match: AppMatch) => {
    if (match.matchId) {
      updateMatch({ ...match, isCreated: true });
    } else {
      const competition = t('app.main.matches.created');

      const country = isNeutralVenue
        ? t('app.main.matches.neutral')
        : homeTeam?.name;

      const venue = country ? { country } : null;

      const time = { millis: endDate.getTime() };

      addMatch({
        ...match,
        time,
        competition,
        venue,
        isCreated: true,
      });
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
          <Translate
            text={
              isNeutralVenue ? 'app.main.modal.team' : 'app.main.modal.home'
            }
          />
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
          <Translate
            text={
              isNeutralVenue ? 'app.main.modal.team' : 'app.main.modal.away'
            }
          />
        }
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
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

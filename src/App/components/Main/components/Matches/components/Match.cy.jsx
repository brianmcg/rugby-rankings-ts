// import React from 'react'
import Match from './Match';

const match = {
  'matchId': 'af187cac-7848-48a4-a634-ed10916e9fc8',
  'homeTeam': {
    'id': '40',
    'altId': '04d2f378-4674-4932-a2bf-9f36537b4618',
    'name': 'Argentina',
    'abbreviation': 'ARG',
    'countryCode': null,
    'annotations': null,
    'country': 'Argentina',
  },
  'awayTeam': {
    'id': '38',
    'altId': 'd655c863-3956-41fe-955d-02f7d2d00bc5',
    'name': 'Australia',
    'abbreviation': 'AUS',
    'countryCode': null,
    'annotations': null,
    'country': 'Australia',
  },
  'homeScore': null,
  'awayScore': null,
  'venue': {
    'id': '799',
    'altId': '1326855f-5e59-4f4c-bfef-73e85b3022ed',
    'name': 'Estadio Brigadier Estanislao López',
    'city': 'Santa Fe',
    'country': 'Argentina',
  },
  'time': {
    'millis': 1725735600000,
    'gmtOffset': -3,
    'label': '2024-09-07',
  },
  'competition': 'The Rugby Championship 2024',
  'isNeutralVenue': false,
  'isWorldCup': false,
  'isComplete': false,
};

describe('<Match />', () => {
  it('renders', () => {
    const selectMatchSpy = cy.spy().as('selectMatchSpy');
    const removeMatchSpy = cy.spy().as('removeMatchSpy');

    cy.mount(
      <Match
        match={match}
        selectMatch={selectMatchSpy}
        removeMatch={removeMatchSpy}
      />,
    );

    cy.get('.MuiButtonBase-root').click({ multiple: true });
    cy.get('@selectMatchSpy').should('be.called');
    cy.get('@removeMatchSpy').should('be.called');
  });
});

import React from 'react';
import { withTranslation } from 'react-i18next';

import './PersonBlock.scss';

import { PersonCard } from '../PersonCard/PersonCard';

import SashaPhoto from '../../assets/SashaPhoto.jpg';
import SashaKondPhoto from '../../assets/SashaKondPhoto.jpg';
import VovaPhoto from '../../assets/VovaPhoto.jpeg';
import AsmanPhoto from '../../assets/AsmanPhoto.jpeg';
import SavvaPhoto from '../../assets/SavvaPhoto.jpeg';
import ArtemiiPhoto from '../../assets/ArtemiiPhoto.png';
import MishaPhoto from '../../assets/MishaPhoto.jpeg';
import VovaKalachevPhoto from '../../assets/VovaKalachevPhoto.jpeg';

export function PersonBlock({ t }) {
  return <div className="person-block">
    <div className="person-block__row">
      <PersonCard photo={SashaPhoto}
        name={t('about.team.sashaKir.name')}
        position={t('about.team.sashaKir.pos')} />
      <PersonCard photo={AsmanPhoto}
        name={t('about.team.asman.name')}
        position={t('about.team.asman.pos')} />
      <PersonCard photo={SavvaPhoto}
        name={t('about.team.savva.name')}
        position={t('about.team.savva.pos')} />
      <PersonCard photo={MishaPhoto}
        name={t('about.team.misha.name')}
        position={t('about.team.misha.pos')} />
    </div>
    <div className="person-block__row">
      <PersonCard photo={SashaKondPhoto}
        name={t('about.team.sashaKond.name')}
        position={t('about.team.sashaKond.pos')}
        mentorText={t('about.team.sashaKond.mentorship')} />
      <PersonCard photo={VovaPhoto}
        name={t('about.team.vova.name')}
        position={t('about.team.vova.pos')}
        mentorText={t('about.team.vova.mentorship')} />
      <PersonCard photo={ArtemiiPhoto}
        name={t('about.team.artemii.name')}
        position={t('about.team.artemii.pos')}
        mentorText={t('about.team.artemii.mentorship')} />
      <PersonCard photo={VovaKalachevPhoto}
        name={t('about.team.vovaKalach.name')}
        position={t('about.team.vovaKalach.pos')}
        mentorText={t('about.team.vovaKalach.mentorship')} />
    </div>
  </div>
}

export default withTranslation()(PersonBlock);

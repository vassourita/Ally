import React from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/logo/icon@3x.png';

import { Container } from './styles';

function DashboardHeader() {
  const location = useLocation();

  function getTitle() {
    const titles = {
      jobs: 'Vagas',
      chat: 'Mensagens',
      profile: 'Perfil',
      rate: 'Avaliar',
    };
    const title = location.pathname
      .split('')
      .filter(c => c !== '/')
      .join('');
    return titles[title] || '404';
  }

  return (
    <Container>
      <div></div>
      <img src={logo} alt="ally" />
      <h1>{getTitle()}</h1>
    </Container>
  );
}

export default DashboardHeader;
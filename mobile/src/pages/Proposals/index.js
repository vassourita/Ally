import React, { useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import * as ProposalActions from '../../store/modules/proposals/actions';
import api from '../../services/api';

import { Container, List, Card, NoProposals } from './styles';
import { toast } from 'react-toastify';

function Proposals() {
  const proposals = useSelector(state => state.proposals);
  const chats = useSelector(state => state.chats);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    api
      .get('/proposals')
      .then(response => {
        if (response.data.proposals) {
          dispatch(ProposalActions.setProposals(response.data.proposals));
        } else {
          dispatch(ProposalActions.setProposals([]));
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      })
      .catch(e => toast.error('Ocorreu um erro inesperado em nosso servidor'));
  }, [dispatch]);

  function getProposalDate(jobDate) {
    const difference = differenceInCalendarDays(new Date(jobDate), new Date());

    if (difference === 0) {
      return 'hoje';
    }
    if (difference === -1) {
      return `ontem`;
    }
    return `a ${-difference} dias atrás`;
  }

  function getStatus(status) {
    if (status === 'awaiting') {
      return (
        <span>
          aguardando resposta
          <FiClock />
        </span>
      );
    }
    if (status === 'denied') {
      return (
        <span style={{ color: 'var(--ally-red)' }}>
          não aceito
          <FiXCircle />
        </span>
      );
    }
    if (status === 'accepted') {
      return (
        <span style={{ color: 'var(--ally-blue)' }}>
          ver conversa
          <FiCheckCircle />
        </span>
      );
    }
  }

  return (
    <Container>
      <List>
        {proposals.length ? (
          proposals.map(proposal => (
            <Card
              onClick={() => {
                const chat = chats.find(c => c.employer_id === proposal.job.employer.id);
                if (chat && proposal.status === 'accepted') {
                  history.push(`/chat/${chat.id}`);
                } else {
                  history.push(`/proposals/${proposal.id}`);
                }
              }}
              key={proposal.id}
            >
              <h3>{proposal.job.name}</h3>
              <p>
                por <strong>{proposal.job.employer.name}</strong>
              </p>
              <p>
                em{' '}
                <strong>
                  {proposal.job.employer.city} - {proposal.job.employer.state}
                </strong>
              </p>
              <p>
                proposta enviada<strong> {getProposalDate(proposal.created_at)}</strong>
              </p>
              <div>{getStatus(proposal.status)}</div>
            </Card>
          ))
        ) : (
          <NoProposals>Nenhuma proposta feita ou aguardando resposta</NoProposals>
        )}
      </List>
    </Container>
  );
}

export default Proposals;

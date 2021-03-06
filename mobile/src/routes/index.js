import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as NotificationActions from '../store/modules/notifications/actions';
import * as ChatActions from '../store/modules/chats/actions';
import * as socket from '../services/socket';

import Account from './Account';
import Dashboard from './Dashboard';
import DetailPages from './DetailPages';

function Routes() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const path = location.pathname.split('').slice(0, 5).join('');

  useEffect(() => {
    socket.connect(auth.id);
    socket.unsubscribeToNotifications();
    socket.unsubscribeToMessages();

    socket.subscribeToNotifications(data => {
      dispatch(NotificationActions.addNotification(data.notification));

      toast.info(data.notification.description);
    });

    socket.subscribeToMessages(data => {
      dispatch(ChatActions.addMessage(data.message.chat.id, data.message));
      if (toast.isActive) {
        return;
      }
      if (path !== '/chat') {
        toast.info(`Nova mensagem de ${data.message.chat.employer.name}`, {
          onClick: () => history.push(`/chat/${data.message.chat.id}`),
        });
      }
    });
  }, [auth.id, dispatch, history, path]);

  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/login" />} />
      <Route path={['/login', '/register']} component={Account} />
      <Route path={['/jobs/:id', '/proposals/:id', '/chat/:id']} component={DetailPages} />
      <Route path={['/profile', '/chat', '/jobs', '/notifications', '/proposals']} component={Dashboard} />
    </Switch>
  );
}

export default Routes;

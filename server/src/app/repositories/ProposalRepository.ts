import Repository from './BaseRepository';

const ChatRepository = new Repository('proposal', {
  id: {
    primary: true,
    type: Number(),
  },
  user_id: { type: Number() },
  job_vacancy_id: { type: Number() },
});

export default ChatRepository;

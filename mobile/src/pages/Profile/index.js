import React, { useEffect, useState } from 'react';
import { FiFile, FiCheckSquare, FiXSquare, FiPlus, FiTrash, FiEdit, FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import InputBlock from '../../components/InputBlock';
import SelectBlock from '../../components/SelectBlock';

import { formatPhone } from '../../utils/formatters/formatPhone';

import * as UserActions from '../../store/modules/user/actions';
import api from '../../services/api';

import {
  Container,
  ModalContainer,
  Image,
  Info,
  Content,
  Title,
  Knowledges,
  DoubleInput,
  EditButton,
  EditInput,
  LogoffButton,
  File,
} from './styles';

const options = [
  { label: 'Especialização', value: 1 },
  { label: 'Graduação', value: 2 },
  { label: 'Certificação', value: 3 },
  { label: 'Curso', value: 4 },
  { label: 'Experiência', value: 5 },
  { label: 'Conhecimento', value: 6 },
];

function Profile() {
  const { user, auth } = useSelector(state => ({ auth: state.auth, user: state.user }));
  const dispatch = useDispatch();

  const history = useHistory();

  const [editMode, setEditMode] = useState(false);
  const [excludeMode, setExcludeMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    typeId: 6,
    name: '',
    about: user.about,
    curriculum: null,
  });

  useEffect(() => {
    api.get(`/users/${auth.id}`).then(response => {
      if (response.data.user) {
        dispatch(UserActions.setUser(response.data.user));
      }
    });
  }, [auth.id, dispatch]);

  const handleDeleteKnowledge = async id => {
    try {
      const { data } = await api.put('/users', {
        removeKnowledge: id,
      });

      if (data.updated.removeKnowledge) {
        return dispatch(UserActions.removeKnowledge(id));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  const handleAddKnowledge = async () => {
    try {
      const { data } = await api.put('/users', {
        addKnowledge: [
          {
            typeId: editData.typeId,
            name: editData.name,
          },
        ],
      });

      if (data.updated.addKnowledge.length) {
        setModalOpen(false);
        return dispatch(UserActions.setUser(data.user));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    setModalOpen(false);
  };

  const handleEditProfile = async () => {
    setEditMode(!editMode);
    if (user.about !== editData.about) {
      try {
        const response = await api.put('/users', {
          about: editData.about,
        });

        if (response.data.updated.about) {
          return dispatch(UserActions.setUser(response.data.user));
        }

        toast.error('Ocorreu um erro inesperado em nosso servidor');
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    }
  };

  useEffect(() => {
    if (editData.curriculum && editData.curriculum !== user.curriculum) {
      (async () => {
        try {
          const data = new FormData();

          data.append('file', editData.curriculum);

          const response = await api.post('/curriculums', data);

          if (response.data.updated) {
            setEditMode(false);
            return dispatch(UserActions.updateUser({ curriculum: response.data.updated }));
          }
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        } catch (error) {
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData.curriculum]);

  const handleEditCurriculum = async e => {
    e.preventDefault();
    setEditData({
      ...editData,
      curriculum: e.target.files[0],
    });
  };

  const handleLogoff = async () => {
    history.push('/login');
  };

  return (
    <Container>
      <Modal className="modal-refactor" overlayClassName="overlay-refactor" isOpen={modalOpen}>
        <ModalContainer>
          <Title>Adicionar conhecimento</Title>
          <SelectBlock
            onChange={({ label, value }) => setEditData({ ...editData, typeId: value })}
            label="Tipo"
            options={options}
          ></SelectBlock>
          <InputBlock
            label="Nome"
            id="knowledge-name"
            value={editData.name}
            onChange={e => setEditData({ ...editData, name: e.target.value })}
          ></InputBlock>
          <DoubleInput>
            <Button
              disabled={!editData.name || !editData.typeId}
              style={{ borderColor: 'var(--ally-blue)' }}
              outlined
              onClick={handleAddKnowledge}
            >
              <FiCheckSquare color="var(--ally-blue)" />
            </Button>
            <Button
              style={{ borderColor: 'var(--ally-red)' }}
              outlined
              onClick={() => {
                setEditData({ typeId: 0, name: '' });
                setModalOpen(false);
              }}
            >
              <FiXSquare color="var(--ally-red)" />
            </Button>
          </DoubleInput>
        </ModalContainer>
      </Modal>

      <Image src={`${process.env.REACT_APP_FILES_URL}${user.image_url}`} />
      <LogoffButton onClick={handleLogoff}>
        Sair <FiLogOut size={20} />
      </LogoffButton>
      <EditButton>
        <FiEdit size={20} color={editMode ? 'var(--ally-red)' : 'unset'} onClick={handleEditProfile} />
      </EditButton>

      <Info>
        <h3>{user.name}</h3>
        <Title>Sobre</Title>
        {editMode ? (
          <EditInput
            placeholder="Adicione uma descrição"
            value={editData.about || user.about}
            onChange={e => setEditData({ ...editData, about: e.target.value })}
          />
        ) : (
          <Content>{user.about || 'Não há descrição ainda'}</Content>
        )}
        <Title>Contato</Title>
        <Content>{user.email}</Content>
        <Content>{user.phone && formatPhone(user.phone.toString())}</Content>
        <Title>Endereço</Title>
        <Content>
          {user.city} - {user.state}
        </Content>
        <Content>{user.neighborhood}</Content>
        <Content>{user.address}</Content>
        <Title>Currículo</Title>
        <Content>
          <File htmlFor="file-curriculum">
            <FiFile />
            {editMode ? (
              <>
                Toque para {user.curriculum ? 'editar' : 'adicionar'} seu currículo
                <input
                  onChange={handleEditCurriculum}
                  id="file-curriculum"
                  type="file"
                  accept="image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                />
              </>
            ) : user.curriculum ? (
              <a
                href={`${process.env.REACT_APP_FILES_URL}${user.curriculum}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Toque para ver seu currículo
              </a>
            ) : (
              'Nenhum currículo adicionado'
            )}
          </File>
        </Content>
        <Knowledges>
          <div>
            <Title>Conhecimentos</Title>
            <div>
              <FiTrash
                color={excludeMode ? 'var(--ally-red)' : 'unset'}
                size={20}
                onClick={() => setExcludeMode(!excludeMode)}
              />
              <FiPlus color={modalOpen ? 'var(--ally-red)' : 'unset'} size={20} onClick={() => setModalOpen(true)} />
            </div>
          </div>
          {!user.knowledges?.length && <Content>Nenhum conhecimento adicionado</Content>}
          {user.knowledges?.map(k => (
            <Content key={k.id}>
              {k.type.name} - {k.name}
              {excludeMode && <FiTrash onClick={() => handleDeleteKnowledge(k.id)} />}
            </Content>
          ))}
        </Knowledges>
      </Info>
    </Container>
  );
}

export default Profile;

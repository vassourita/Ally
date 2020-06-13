/* eslint-disable import/prefer-default-export */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('user')
    .where('employer', true)
    .del()
    .then(() => {
      return knex('user').insert([
        {
          name: 'CandyLand',
          email: 'contato@candyland.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '29012937000169',
          phone: '13997261001',
          image_url: 'seed-user-1.jpg',
          postal_code: '11095570',
          city: 'Santos',
          state: 'SP',
          address: 'Rua Murillo Veiga de Oliveira',
          neighborhood: 'Alemoa',
          microregion_id: 35063,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: true,
        },
        {
          name: 'Restaurante Top',
          email: 'contato@restaurantetop.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '29012937000169',
          phone: '13997261001',
          image_url: 'seed-user-2.jpg',
          postal_code: '11431220',
          city: 'Guarujá',
          state: 'SP',
          address: 'Alameda das Rosas',
          neighborhood: 'Jardim Primavera',
          microregion_id: 35063,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: true,
        },
        {
          name: 'Pizzaria Bella Pizza',
          email: 'contato@pizzariabellapizza.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '29012937000169',
          phone: '13997261001',
          image_url: 'seed-user-3.jpg',
          postal_code: '69915856',
          city: 'Rio Branco',
          state: 'AC',
          address: "Rua Pau-d'arco",
          neighborhood: 'Portal da Amazônia',
          microregion_id: 12004,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: true,
        },
        {
          name: 'BarÃO',
          email: 'contato@barao.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '29012937000169',
          phone: '13997261001',
          image_url: 'seed-user-4.jpg',
          postal_code: '11060003',
          city: 'Santos',
          state: 'SP',
          address: 'Avenida Ana Costa',
          neighborhood: 'Gonzaga',
          microregion_id: 35063,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: true,
        },
        {
          name: "Domino's",
          email: 'contato@dominos.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '29012937000169',
          phone: '13997261001',
          image_url: 'seed-user-5.jpg',
          postal_code: '11040050',
          city: 'Santos',
          state: 'SP',
          address: 'Conselheiro Ribas',
          neighborhood: 'Embaré',
          microregion_id: 35063,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: true,
        },
        {
          name: 'Confeitaria do Circo',
          email: 'contato@confeitariadocirco.com',
          password: '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW',
          fiscal_code: '29012937000169',
          phone: '11997261001',
          image_url: 'seed-user-6.jpg',
          postal_code: '02373190',
          city: 'São Paulo',
          state: 'SP',
          address: 'Travessa Conchilia',
          neighborhood: 'Vila Albertina',
          microregion_id: 35061,
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          employer: true,
        },
      ]);
    });
}

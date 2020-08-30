'use strict';
import '../styles/styles.css';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import galleryTemplate from '../templates/gallery-templates.hbs';
import apiService from './services/apiService.js';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import 'material-design-icons/iconfont/material-icons.css';
import _ from 'lodash';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector(`button[data-action="load-more"]`),
};

refs.searchForm.addEventListener(
  'input',
  _.debounce(searchFormInputHandler, 1000),
);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', ImageclickHandler);

function searchFormInputHandler(e) {
  e.preventDefault();
  const searchQuery = e.target.value;
  apiService.resetPage();
  apiService.searchQuery = searchQuery;
  e.target.value = '';
  clearMarkup();
  createGallery();
  refs.loadMoreBtn.classList.add('visible');
}

function loadMoreBtnHandler() {
  createGallery();
}

function createGallery() {
  apiService
    .fetchImages()
    .then(buildListItemsMarkup)
    .catch(error => {
      alert('Somthing bad happend');
      console.warn(error);
    });
}

function buildListItemsMarkup(items) {
  const position = refs.gallery.clientHeight;
  if (items.length > 0) {
    const markup = galleryTemplate(items);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    scroll(position);
  } else error('No such image found');
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function ImageclickHandler(e) {
  basicLightbox
    .create(
      `
      <img src="${e.target.dataset.source}">
  `,
    )
    .show();
}

function scroll(position) {
  window.scrollTo({
    top: position + refs.searchForm.clientHeight,
    behavior: 'smooth',
  });
}

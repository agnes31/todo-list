class Tache {
    constructor(el, index) {
      this._el = el;
  
      this._elBtnDetail = this._el.querySelector('[data-js-tache-detail]');
      this._elBtnSupprimer = this._el.querySelector('[data-js-tache-supprimer]');
  
      this._index = index;
  
      this.afficherDetail = this.afficherDetail.bind(this);
      this.supprimerTache = this.supprimerTache.bind(this);
  
      this.init();
    }
  
    init() {
      this._elBtnDetail.addEventListener('click', this.afficherDetail);
      this._elBtnSupprimer.addEventListener('click', this.supprimerTache);
    }
  
    afficherDetail() {
      let tache = {};
      for (let i = 0, l = aTaches.length; i < l; i++) {
        if (aTaches[i].index === this._index) {
          tache = aTaches[i];
          break;
        }
      }
  
      document.getElementById('detail-tache').innerHTML = `Tâche: ${tache.tache}`;
      document.getElementById('detail-description').innerHTML = `Description: ${tache.description}`;
      document.getElementById('detail-importance').innerHTML = `Importance: ${tache.importance}`;
    }
  
    supprimerTache() {
      let elTaches = document.querySelectorAll('[data-js-tache]');
  
      for (let i = 0, l = elTaches.length; i < l; i++) {
        if (elTaches[i].dataset.jsTache === this._index) {
          elTaches[i].remove();
        }
      }
  
      let index;
      for (let i = 0, l = aTaches.length; i < l; i++) {
        if (aTaches[i].index === this._index) {
          index = i;
          break;
        }
      }
  
      if (index) {
        aTaches.splice(index, 1);
      }
    }
  }
  
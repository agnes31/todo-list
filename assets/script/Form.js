class Form {
    constructor(el) {
      this._el = el;
      this._elForm = this._el.querySelector('form');
      this._elInputTache = this._elForm.tache;
      this._elInputDescription = this._elForm.description;
      this._elInputImportance = this._elForm.importance;
      this._elBtn = this._elForm.querySelector('[data-js-btn]');
      this._elBtnTriAlpha = document.querySelector('[data-js-tri-alphabetique]');
      this._elBtnTriImportance = document.querySelector('[data-js-tri-importance]');
      this._elTaches = document.querySelector('[data-js-taches]');
  
      this.init();
    }  
  
    init() {
        this._elBtn.addEventListener('click', this.gereFormulaire.bind(this));
        this._elBtnTriAlpha.addEventListener('click', this.trierAlpha.bind(this));
        this._elBtnTriImportance.addEventListener('click', this.trierImportance.bind(this));
    }
  
    gereFormulaire(e) {
      e.preventDefault();
          
      if(this.valideFormulaire()) {
        const tacheObj = {
          index: `${aTaches.length + 1}-${this._elInputTache.value}-${this._elInputImportance.value}`,
          tache: this._elInputTache.value,
          description: this._elInputDescription.value,
          importance: this._elInputImportance.value
        };
  
        //ajoute la tâche au tableau de tâches (faire un fichier comme aTache)
        aTaches.push(tacheObj);
  
        this.injecteTache();
      }
    }
  
    valideFormulaire() {
      let estValide = true;
  
      if (this._elInputTache.value == '') {
        estValide = false;
        this._elInputTache.labels[0].style.color = 'red';
      } else {
        estValide = true;
        this._elInputTache.labels[0].style.color = 'black';
      }
  
      if (this._elInputDescription.value == '') {
        estValide = false;
        this._elInputDescription.labels[0].style.color = 'red';
      } else {
        estValide = true;
        this._elInputDescription.labels[0].style.color = 'black';
      }
  
      if (this._elInputImportance.value == '') {
        estValide = false;
        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
          this._elInputImportance[0].labels[0].style.color = 'red';
        }
      } else {
        estValide = true;
        for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
          this._elInputImportance[0].labels[0].style.color = 'black';
        }
      }
  
      return estValide;
    }
  
    trierAlpha() {
      aTaches.sort(function(a, b) {
        return a.importance - b.importance;
      });
  
      this.injecteTache();
    }
  
    trierImportance() {
      aTaches.sort((a, b) => {
        let fa = a.tache.toLowerCase(),
            fb = b.tache.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
  
      this.injecteTache();
    }
  
    injecteTache() {
      this._elTaches.innerHTML = '';
  
      for (let i = 0, l = aTaches.length; i < l; i++) {
        const dom =
          `
          <div data-js-tache="${aTaches[i].index}">
            <span>Tâche : ${aTaches[i].tache}</span>
            <span>Importance: ${aTaches[i].importance}</span>&nbsp;&nbsp;
            <button data-js-tache-detail>Afficher le détail</button>&nbsp;
            <button data-js-tache-supprimer>Supprimer</button>
          </div>`;
  
        this._elTaches.insertAdjacentHTML('beforeend', dom);
  
        new Tache(this._elTaches.lastElementChild, aTaches[i].index);
      }
    }
  };
  
  // Function for showing hidden pop-ups  
  export function togglePopUp (type: string, remove: boolean){
    if (type == "commentForm"){
      var element = document.getElementById("commentFormBackground") as HTMLDivElement;
      var element2 = document.getElementById("commentForm") as HTMLDivElement;
      var nameOfClass = "opacityWhole2"
    }else {
      var element = document.getElementById("registerPopUpBackground") as HTMLDivElement;
      var element2 = document.getElementById("registerPopUp") as HTMLDivElement;
      var nameOfClass = "movedDown"
    }
    if(remove){
      element.classList.remove('appeared');
      element2.classList.remove(nameOfClass);
    }else{
      element.classList.add('appeared');
      element2.classList.add(nameOfClass);
    }
  }
  
  export const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  // It changes styles when catalogue checkboxes toggled
  export function toggleCatalogueCheckbox(id: string) {
    var line = document.getElementById(id + "checkbox") as HTMLDivElement;
    var bttn = document.getElementById(id) as HTMLInputElement;
    if (bttn.checked) {
      line.classList.add("opacityWhole");
    } else {
      line.classList.remove("opacityWhole");
    }
  }

  export const pricesList = [
    "Gratis",
    "1k - 10k",
    "10k - 50k",
    "50k - 100k",
    "100k - 150k",
    "+ 150k"
  ];
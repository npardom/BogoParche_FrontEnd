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
  
  // Function for loggin out, it clears the local storage tokens
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

  // Function for the parallax effect
  onmousemove = function(e){
    var element0= document.getElementById("clouds1") as HTMLDivElement;
    var element= document.getElementById("clouds2") as HTMLDivElement;
    var element2= document.getElementById("mountain1") as HTMLDivElement;
    var element3= document.getElementById("mountain2") as HTMLDivElement;
    var element4= document.getElementById("citySkyline") as HTMLDivElement;

    element0.style.backgroundPositionX = (e.clientX /-1000).toString() +"em";
    element.style.backgroundPositionX = (e.clientX /-400).toString() +"em";

    element2.style.backgroundPositionX = (e.clientX /-320 + 40).toString() +"em";
    element3.style.backgroundPositionX = (e.clientX /-180 ).toString() +"em";
    element4.style.backgroundPositionX = (e.clientX /-110 ).toString() +"em";
  };

  export const refreshToken = () => {
    return localStorage.getItem("refresh");
  }

  export const accessToken = () => {
    return localStorage.getItem("access");
  }

  export function updateRefreshToken(){
    const body = {refresh: refreshToken()};
    fetch("/api/auth/refresh", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken(),
      },
    })
    .then((response) => response.json())
    .then((result) => {
      alert("updating")
      alert(result.access)
      alert(result.refresh)
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
    });
  }
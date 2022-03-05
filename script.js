var value = "";

function getValue() {
    const inputElement = document.getElementById("inputName");
    value = inputElement.value;
  }
  
function submitName() {
  document.getElementById("result").innerHTML = "";
  if (value.includes(",")) {
    let dataResponse = getData(true);
    dataResponse.then((data) => {
        console.log(data);
        data.forEach(item => generateHTML(item))
      });
  } else {
    let dataResponse = getData(false);
    dataResponse.then((data) => {
      console.log(data);
      generateHTML(data);
    });
  }
}

async function getData(isMultipledata) {
  if (isMultipledata) {
    const names = value.split(",");
    let url = "https://api.nationalize.io/?";
    names.forEach((element, index) => {
      if (index === names.length - 1) {
        url += "name[]=" + element;
      } else {
        url += "name[]=" + element + "&";
      }
    });
    let response = await fetch(url);
    console.log(response);
    if (response.status == 200) {
      return response.json();
    }
    throw new Error(response.status);
  } else {
    const url = "https://api.nationalize.io/?name=" + value.toString();
    let response = await fetch(url);
    console.log(response);
    if (response.status == 200) {
      return response.json();
    }
    throw new Error(response.status);
  }
}

function generateHTML(nationalityInfo) {
  let nationality_name = "";
  let nationality_country = "";
  let nationality_probability = "";

  let html_div = "";
  if (nationalityInfo.country.length > 0) {
    nationality_name = nationalityInfo.name;
//     nationalityInfo.country.sort((a, b) =>
//       a.country_id < b.country_id ? 1 : b.country_id < a.country_id ? -1 : 0
//     );
    console.log(nationalityInfo);

    for (let i = 0; i <= 1; i++) {
      if (nationalityInfo.country[i]) {
        nationality_country = nationalityInfo.country[i].country_id;
        nationality_probability = nationalityInfo.country[i].probability;
        html_div = `<div class="box red">
                                <h2><mark>${nationality_name}</mark></h2>
                                <p><b>Country</b> : ${nationality_country}</p>
                                <p><b>Probability</b> : ${nationality_probability}</p>
                            </div> `;
        document.getElementById("result").innerHTML += html_div;
      }
    }
  } else {
    html_div = `<div class="box red">
                                <h2>No Results found...!!</h2>
                            </div> `;
    document.getElementById("result").innerHTML += html_div;
  }
}



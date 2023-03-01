const $form = document.querySelector("form");

const getLeads = async (term) => {
  const response = await fetch(`http://192.168.0.41:3333/leads/${term}`);

  const leads = await response.json();

  return leads;
};

const printLeads = (leads) => {
  const $leads = document.querySelector(".customer-list");

  const $leadBox = document.createElement("li");

  const $leadName = document.createElement("h2");
  $leadName.textContent = leads.name;

  const $leadLink = document.createElement("a");
  $leadLink.textContent = leads.whatsapp;
  $leadLink.href = leads.whatsapp;
  $leadLink.target = "_blank";

  $leadBox.appendChild($leadName);
  $leadBox.appendChild($leadLink);

  $leadBox.addEventListener("click", () => {
    $leadBox.classList.toggle("active");
  });

  $leads.appendChild($leadBox);
};

$form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const $input = document.querySelector(".search-input");
  const $leads = document.querySelector(".customer-list");

  const term = $input.value;

  if (!term) return alert("Digite algo");

  $leads.innerHTML = "Procurando... Isso pode demorar";

  const leads = await getLeads(term);

  $leads.innerHTML = "";

  leads.forEach((lead) => {
    printLeads(lead);
  });
});

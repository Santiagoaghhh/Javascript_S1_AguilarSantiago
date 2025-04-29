let deckId = '';

// 1. Crear una nueva baraja
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id;
    console.log('Deck creado:', deckId);

    // 2. Sacar 2 cartas
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
  })
  .then(res => res.json())
  .then(data => {
    console.log('Cartas sacadas:', data.cards);
    data.cards.forEach(carta => {
      document.body.innerHTML += `<img src="${carta.image}" />`;
    });
  })
  .catch(error => console.error('Error en el flujo de cartas', error));

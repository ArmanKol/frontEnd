describe('registratie test', ()=>{

    it('herleiden naar de website', () =>{
      cy.visit("http://localhost:4200/registreer")
    })
    it("registratie klaarzetten", () =>{
      cy.get('input[name=naam]').type("ruben")
      cy.get('input[name=wachtwoord]').type('Hahahah123')
      cy.get('input[name=email]').type('ruben_horstman@outlook.com')
      cy.get('input[name=achternaam]').type('horstman')
      cy.get('input[name=studentnummer]').type('1720824')
      cy.get('input[name=opleiding]').type('sie')

      cy.get('button[name=aanvraag]').click()
    })
  })

  describe('registratie test', ()=>{

    it('herleiden naar de website', () =>{
      cy.visit("http://localhost:4200/registreer")
    })
    it("registratie klaarzetten", () =>{
      cy.get('input[name=naam]').type("Ruben")
      cy.get('input[name=wachtwoord]').type('hallo123')
      cy.get('input[name=email]').type('rubenhor@out.com')
      cy.get('input[name=achternaam]').type('horst')
      cy.get('input[name=studentnummer]').type('1720824')
      cy.get('input[name=opleiding]').type('sie')

      cy.get('button[name=aanvraag]').click()
    })
  })

  describe('registratie test', ()=>{

    it('herleiden naar de website', () =>{
      cy.visit("http://localhost:4200/registreer")
    })
    it("registratie klaarzetten", () =>{
      cy.get('input[name=naam]').type("teun")
      cy.get('input[name=wachtwoord]').type('hallo123')
      cy.get('input[name=email]').type('rubenhor@out.com')
      cy.get('input[name=achternaam]').type('horst')
      cy.get('input[name=studentnummer]').type('1720824')
      cy.get('input[name=opleiding]').type('sie')

      cy.get('button[name=aanvraag]').click()
    })
  })

  describe('fail test', ()=>{

    it('advertentie aanmaken', () =>{
      cy.visit("http://localhost:4200/registreer")
    })
    it("registratie klaarzetten", () =>{
      cy.get('input[name=naam]').type("Ruben")
      cy.get('input[name=wachtwoord]').type('haha')
      cy.get('input[name=email]').type('hout')
      cy.get('input[name=achternaam]').type('horst')
      cy.get('input[name=studentnummer]').type('1720824')
      cy.get('input[name=opleiding]').type('sie')

      cy.get('button[name=aanvraag]').click()
    })
  })

  describe('succes test', ()=>{

    it('advertentie aanmaken', () =>{
      cy.visit("http://localhost:4200/registreer")
    })
    it("registratie klaarzetten", () =>{
      cy.get('input[name=naam]').type("Jean-pierre")
      cy.get('input[name=wachtwoord]').type('hoi12345')
      cy.get('input[name=email]').type('ha@.nl')
      cy.get('input[name=achternaam]').type('achternaam')
      cy.get('input[name=studentnummer]').type('000')
      cy.get('input[name=opleiding]').type('sie')
      cy.get('button[name=aanvraag]').click()
    })
  })


  
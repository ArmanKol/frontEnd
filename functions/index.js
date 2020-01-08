const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ruben.marijn.horst@gmail.com', 
        pass: 'Wolla12345'
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: '<ruben.marijn.horstman@gmail.com>',
    subject: 'Node Contact Request', 
    text: 'Hello world?'
};

exports.goedgekeurdEmail = functions.firestore
    .document('aanvragen/{docId}')
    .onUpdate((snapshot, context) => {
        const aanvraagid = context.params.docId;
        const db = admin.firestore()
        return db.collection('aanvragen').doc(aanvraagid)
                 .get()
                 .then(doc => {
                    const aanvraag = doc.data()
                    mailOptions.to = aanvraag.email,
                    mailOptions.html = 'Beste' + ' ' + aanvraag.naam + ', <br><br>' + 
                    'Je account is goedgekeurd je kunt nu een datum uitkiezen in de google agenda! <br>' +
                    'Mvg,' +'<br>'+ 'Alex Jongman';
                      
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          res.render('contact', {msg:'Email has been sent'});
                      });
                    return aanvraag
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err))
});


exports.afgewezenEmail = functions.firestore
    .document('aanvragen/{docId}')
    .onDelete((snapshot, context) => {
        const aanvraagid = context.params.docId;
        const db = admin.firestore()
        return db.collection('aanvragen').doc(aanvraagid)
                 .get()
                 .then(doc => {
                    const aanvraag = doc.data()

                    mailOptions.to = aanvraag.email,
                    mailOptions.html = 'Beste' + ' ' + aanvraag.naam + ', <br><br>' + 
                              'Je account is afgekeurd je kunt een nieuw verzoek indienen op de website! <br>' +
                              'Mvg,' +'<br>'+ 'Alex Jongman';                    

                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          res.render('contact', {msg:'Email has been sent'});
                      });
                    return aanvraag
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err))
});

exports.goedgekeurdEmailLokaalAanvraag = functions.firestore
    .document('lokaalaanvragen/{docId}')
    .onUpdate((snapshot, context) => {
        const loginid = context.params.docId
        const db = admin.firestore()
        return db.collection('lokaalaanvragen').doc(loginid)
                 .get()
                 .then(doc => {
                    const lokaalaanvraag = doc.data()
                    mailOptions.to = lokaalaanvraag.email,
                    mailOptions.html = 'De reservering is gelukt je kan het lokaal gebruiken van' + ' ' + lokaalaanvraag.begintijd + ', <br><br>' + 
                    'tot' + lokaalaanvraag.eindtijd+ '<br>'+
                    'op de datum'+ lokaalaanvraag.datum +'<br>'+
                    'Mvg,' +'<br>'+ 'Alex Jongman';
                      
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          res.render('contact', {msg:'Email has been sent'});
                      });
                    return lokaalaanvraag
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err))
});

exports.afgekeurdEmailLokaalAanvraag = functions.firestore
    .document('lokaalaanvragen/{docId}')
    .onDelete((snapshot, context) => {
        const loginid = context.params.docId
        const db = admin.firestore()
        return db.collection('lokaalaanvragen').doc(loginid)
                 .get()
                 .then(doc => {
                     console.log(lokaalaanvraag.email)
                    const lokaalaanvraag = doc.data()
                    mailOptions.to = lokaalaanvraag.email,
                    mailOptions.html = 'De reservering is afgewezen je kan het lokaal gebruiken van <br>' +
                    'je kan een nieuw lokaalaanvraag indienen op de webapplicatie <br>' +
                    'Mvg,' +'<br>'+ 'Alex Jongman';
                      
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          res.render('contact', {msg:'Email has been sent'});
                      });
                    return lokaalaanvraag
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err))
});
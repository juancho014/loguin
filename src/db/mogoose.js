const mongoose = require('mongoose');
const Uri='mongodb+srv://juanfb19:juanjuan2853@cluster0.bc8x13o.mongodb.net/contactos?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
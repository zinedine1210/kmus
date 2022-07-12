handleLoginSubmit = e => {
    if(this.state.submitLogin == false){
        let uus = G().enc(JSON.stringify({
            'us': this.state.us,
            'pw': e.pw
        }), 2, 6)

        const pwd = G().rndStr(uus.length, 1, 6).substring(0, uus.length).replace(/\W/g, "")

        let payload = {
            'us': uus,
            'pw': pwd
        }

        // this.setState({errorLogin:true})

        AuthRepository.postLogin({"uspw":JSON.stringify(payload)})
        .then(responseData =>{
            if(responseData.token){
                // this.setState({errorLogin:false})
                localStorage.setItem("xa", responseData.token);
                // this.handleNotification("success", "Anda berhasil login!")
                console.log("sukses login")
                Router.push('/dashboard');
            } else {
                console.log("Email atau Kata Sandi Salah")
                // this.handleNotification("error", "Email atau Kata Sandi salah!")
            }
        })
    }
};
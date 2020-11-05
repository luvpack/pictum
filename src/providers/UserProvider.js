import fetch from '../utils/fetch.js'

class UserProvider {
    login = async (email, password) => {
        const params = new URLSearchParams()
        params.append('email', email)
        params.append('password', password)

        const data = await fetch.post('/user/login.php', params)

        return data
    }

    register = async (data) => {
        const params = new URLSearchParams()
        params.append('firstName', data['firstName'])
        params.append('lastName', data['lastName'])
        params.append('email', data['email'])
        params.append('password', data['password'])

        const res = await fetch.post('/user/register.php', params)

        return res
    }

    me = async () => {
        const user = await fetch.get('/user/me.php')

        return user
    }

    logout = async () => {
        const response = await fetch.get('/user/logout.php')

        return response
    }
}

export default UserProvider

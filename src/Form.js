import React from 'react'
import Logo from './assets/img/logo.png'

const Form = ({name,region,setName,setRegion,handleSubmit}) => {
    return (
        <div id="form-container">
            <img src={Logo} alt="Logo" />
            <h2>Check On Which Champions You Have Not Obtained The Chest Yet</h2>
            <form onSubmit={handleSubmit}>
                <div id="search-box">
                    <select name="region" id="region">
                        <option value="eun1">EUNE</option>
                        <option value="euw1">EUW</option>
                        <option value="na1">NA</option>
                        <option value="br1">BR</option>
                        <option value="la1">LAN</option>
                        <option value="la2">LAS</option>
                        <option value="oc1">OCE</option>
                        <option value="tr1">TR</option>
                        <option value="jp1">JP</option>
                        <option value="kr">KR</option>
                        <option value="ru">RU</option>
                    </select>
                    <input type="text" id="search" name="search" placeholder="Your summoner name..." value={name} onChange={(e) =>setName(e.target.value)} />
                    <button type="submit"><i className="fas fa-search"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Form

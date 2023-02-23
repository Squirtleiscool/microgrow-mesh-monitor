import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Head>
    <meta name="viewport" content="width=device-width"/>
    <title>MG Mesh Monitor</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
      </Head>

      <main className={styles.main}>
      <nav className="navbar navbar-light background">
        <a className="navbar-brand" href="#">
            <img src="https://1hudmjfcafrhu.cdn.shift8web.ca/wp-content/uploads/2019/05/newweblogo.png"
                className="d-inline align-top" alt=""/>
        </a>

    </nav>

    <div className="container ">

        <h1 className="display-6  py-1 font-weight-normal mt-4  label"> MG Mesh Monitor</h1>


        <div className="form-row">

            <div className="form-group col-md-4 col mt-4">
                <label className="text-white " htmlFor="zone">
                    <h5 className="label">Choose a Zone</h5>
                </label>
                <select className="form-control text-success" name="zone" id="zone">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>

            <div className="form-group col-md-4 col  mt-4">
                <label className="text-white" htmlFor="driver-list">
                    <h5 className="label">Driver List</h5>
                </label>
                <select className="form-control text-success" name="driver-list" id="driver-list">
                </select>
            </div>

            <div className="form-group col-md-4 col  mt-4">
                <label className="text-white" htmlFor="dev-name">
                    <h5 className="label">Device Name</h5>
                </label>
                <div> <input type="text" className="form-control text-success" id="dev-name" value="" readOnly/>
                </div>

            </div>

        </div>

        <div className="mt-5">
            <label className="text-white" htmlFor="variable-name">
                <h5 className="label">Variable List</h5>
            </label>
            <table className="table">
                <thead className = " background text-success">
                  <tr >
                    <th scope="col">Variable Name </th>
                    <th scope="col">Current Value </th>
                    <th scope="col">Min Value</th>
                    <th scope="col">Max Value</th>
                    <th scope="col">Permission</th>
                    <th scope="col">Operations</th>
                  </tr>
                </thead>
                <tbody id="variable-List">
                    
                </tbody>
            </table>
        </div>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js"
        type="text/javascript"/>
    <Script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"/>
    <Script src="js/requests.js"/>
    <Script src="js/browser-ssl.js"/>
    </div>
      </main>
    </>
  )
}

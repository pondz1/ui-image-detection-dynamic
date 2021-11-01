import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {css} from '@emotion/react'
import SyncLoader from 'react-spinners/SyncLoader'

const override = css`
  display: block;
  margin: 2 auto;
  // border-color: red;
`

function App() {
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageRes, setImageRes] = useState(null)
    let [loading, setLoading] = useState(false)
    let [color, setColor] = useState('#ffffff')
    const [url,setUrl] = useState('')

    const onChangeImage = (e) => {
        setImageRes(null)
        let file = e.target.files[0]
        const blob = new Blob([file], {type: 'image/jpeg'})
        let img = URL.createObjectURL(blob)
        setImagePreview(img)
        setImage(file)

    }
    const findMouth = () => {
        setLoading(true)
        let form = new FormData()
        form.append('file', image)
        // const url = 'https://find-mouth.herokuapp.com/getmouth'
        // const url = 'http://localhost:8080/getmouth'
        // const url = 'https://mouth-detect-cj7lvbixpq-uc.a.run.app/getmouth'
        fetch(url, {
            method: 'POST',
            body: form,
        })
            .then((res) => res.blob())
            .then((value) => {
                let urlImg = URL.createObjectURL(value)
                setImageRes(urlImg)
                setLoading(false)
            })
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="container-fluid">
                    <div className="pb-5 pt-5">
                        <h2>Detection</h2>
                        <div className="row justify-content-center pt-3">
                            <div className="col-3">
                                <FormControl
                                    placeholder="URL"
                                    aria-label="URL"
                                    aria-describedby="basic-addon1"
                                    value={url}
                                    onChange={event => {
                                        setUrl(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Input</h3>
                            <div className="pt-2">
                                {image && (
                                    <div>
                                        <img
                                            alt="mouth"
                                            src={imagePreview}
                                            style={{maxWidth: 500}}
                                        />
                                        <div className="pt-5">
                                            {!loading ? (
                                                <Button
                                                    onClick={(e) => findMouth()}
                                                >
                                                    Detect
                                                </Button>
                                            ) : (
                                                <SyncLoader
                                                    color={color}
                                                    loading={loading}
                                                    css={override}
                                                    size={15}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <input
                                    type="file"
                                    onChange={(e) => onChangeImage(e)}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <h3>Output</h3>
                            <div className="pt-2">
                                {imageRes ? (
                                    <img
                                        alt="mouth2"
                                        src={imageRes}
                                        style={{maxWidth: 500}}
                                    />
                                ) : (
                                    <div></div>
                                )}
                                <div className="justify-content-center p-5">
                                    <SyncLoader
                                        color={color}
                                        loading={loading}
                                        css={override}
                                        size={15}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default App;

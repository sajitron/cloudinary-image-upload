import React, { PureComponent, Fragment } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends PureComponent {
	state = {
		selected: null,
		image: null
	};

	renderImage() {
		const public_id = this.state.image.data.public_id;

		return <Image cloudName="sajicode" publicId={public_id} width="500" crop="scale" />;
	}

	handleFileSelect = (event) => {
		this.setState({
			selected: event.target.files[0]
		});
	};

	handleFileUpload = (e) => {
		e.preventDefault();
		console.log(this.state.selected.name);
		const data = new FormData();
		data.append('file', this.state.selected, this.state.selected.name);

		axios
			.post('/api/upload', data)
			.then((res) => {
				this.setState({ image: res.data });
				console.log(this.state.image.data);
			})
			.catch((e) => console.log(e));
	};

	render() {
		return (
			// <div className="App">
			// 	<header className="App-header">
			// 		<img src={logo} className="App-logo" alt="logo" />
			// 		<p>
			// 			Edit <code>src/App.js</code> and save to reload.
			// 		</p>

			// 		<form action="http://localhost:5000/api/upload" method="post" encType="multipart/form-data">
			// 			<input type="file" name="image" />
			// 			<button type="submit">Upload</button>
			// 		</form>
			// 	</header>
			// </div>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>

					<div>
						<h4>This is the Image Upload Page</h4>
						<label>Upload Image</label>
						<Fragment>
							<form onSubmit={this.handleFileUpload}>
								<input type="file" name="picture" onChange={this.handleFileSelect} required />
								{this.state.selected === null ? (
									<button disabled>Upload</button>
								) : (
									<button type="submit">Upload</button>
								)}
							</form>

							<Fragment>{this.state.image && this.renderImage()}</Fragment>
						</Fragment>
					</div>
				</header>
			</div>
		);
	}
}

export default App;

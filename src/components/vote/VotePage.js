import React, {Component} from 'react';
import {base, endpoints} from "../../firebase/base";
import './VotePage.css';
import Option from './Option';

class VotePage extends Component {
  state = {
    question: undefined,
    questionKey: undefined,
    isVoted: false,
    selectedOption: {},
  };

  uuidv4() {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    );
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.setState({questionKey: slug});

    if (localStorage.getItem(slug) !== null) {
      this.setState({
        isVoted: true,
      });
    }

    base.fetch(`${endpoints.questions}/${slug}`, {
      context: this,
      asArray: false,
    }).then(data => {
      this.setState({question: data});
    }).catch(error => {
      console.error(error);
    });
  }

  handleClick = (optionId, optionText) => {
    const selectedOption = {
      optionId: optionId,
      optionText: optionText,
    };

    this.setState({
      selectedOption: selectedOption,
    });
  };

  handleSubmit = () => {
    const {history} = this.props;
    const {questionKey, selectedOption} = this.state;

    let playerId = localStorage.getItem(questionKey);
    const isSubmitAllowed = playerId === null && selectedOption !== undefined;

    if (isSubmitAllowed) {
      playerId = this.uuidv4();
      localStorage.setItem(questionKey, playerId);

      const questionVotesEndpoint = `${endpoints.votes}/${questionKey}/${playerId}`;

      base.post(questionVotesEndpoint, {
        data: this.state.selectedOption,
      }).then(() => {
        const newRoute = "/chart/" + questionKey;
        history.push(newRoute);
        this.setState({isVoted: true});
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  render() {
    const {question, selectedOption} = this.state;
    const optionKeys = question && Object.keys(question.options);

    return (
      <>
        {this.state.isVoted
          ? <div className={'warning'}>You might have been already voted this poll.</div>
          : (
            <>
              <h3>Question: {question && question.text}</h3>
              <div className={'info'}>💁 Please choose one to answer the give question:</div>
              {question && optionKeys.map((key, index) => (
                  <Option divName={selectedOption.optionId === key ? 'active option-item' : 'option-item'}
                          key={index}
                          optionId={key}
                          optionText={question.options[key]}
                          selectAnswer={this.handleClick}/>
                ),
              )}
              {this.state.selectedOption &&
              <div className="form-footer">
                <span className="submit" onClick={this.handleSubmit}>Submit the selected Answer</span>
                <br/>
                <div>ℹ️ share this link to get the voting from the others: <pre> {window.location.href}</pre></div>
              </div>
              }
            </>
          )
        }
      </>
    );
  }
}

export default VotePage;

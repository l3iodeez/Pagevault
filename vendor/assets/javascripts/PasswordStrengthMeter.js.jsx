
var PasswordStrengthMeter = React.createClass({
  getInitialState: function (){
    return {
      resultScore: '',
      warning: '',
      suggestions:''
    };
  },

  handleInput: function (event){
    event.preventDefault();
    var strength = this.props.strength;
    strength = (strength) ? strength : {
      0: "Worst ☹",
      1: "Bad ☹",
      2: "Weak ☹",
      3: "Good ☺",
      4: "Strong ☻"
    };

    var password = ReactDOM.findDOMNode(this.refs.password);
    var meter = ReactDOM.findDOMNode(this.refs.passwordStrengthMeter);
    var text = ReactDOM.findDOMNode(this.refs.passwordStrengthText);

    var val = password.value;
    var result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if(val !== "") {
        this.setState({
          resultScore:strength[result.score],
          warning:result.feedback.warning,
          suggestions:result.feedback.suggestions
        });
    }
    else {
      this.setState({
        resultScore:'',
        warning:'',
        suggestions:''
      });
    }

    if(typeof this.props.onChange === 'function'){
      this.props.onChange(event, result.score);
    }
  },

  render: function () {
    var passwordText = this.props.passwordText;
    var passwordHeader = (passwordText) ? passwordText : 'Enter Password';
    var resultScore = this.state.resultScore;
    var warning = this.state.warning;
    var suggestions =  this.state.suggestions;
    return(
      <section>
        <label forHtml="password">{passwordHeader}</label>
        <input onInput={this.handleInput} type="text" name="password" id="password" ref="password" />

        <meter max="4" id="password-strength-meter" ref="passwordStrengthMeter"></meter>
        <p id="password-strength-text" ref="passwordStrengthText">
          {resultScore &&
            "Strength: "}
            <strong>{resultScore}</strong><span className="feedback">{warning + " " + suggestions}</span>
        </p>
      </section>
    );
  },
   propTypes: {
    passwordText: React.PropTypes.string,
    strength: React.PropTypes.object,
    onChange: React.PropTypes.func,
  }
});

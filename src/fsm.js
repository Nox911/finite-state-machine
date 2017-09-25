class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
         if (arguments[0]==undefined) {
            return Err;
         }
         this.initial = config.initial;
         this.st=config.initial;
         this.states=config.states;
         this.transitions=['normal'];
         this.count=0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {       
       return this.st;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        switch(state) {
            case 'busy':
            this.st='busy';
            break;

            case 'sleeping' :
            this.st='sleeping';
            break;

            case 'hungry':
            this.st='hungry';
            break;

            case 'normal':
             this.st='normal';
            break;

            default :
            return err;
        }  
        this.transitions.splice(this.count+1 , this.transitions.length);
        this.transitions.push(this.st);
        this.count++;   
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        switch(event) {
            case 'study':
            if (this.st=='normal'){
                this.st='busy';
            }
            else {return Err;}
            break;

            case 'get_tired':
            if (this.st=='busy') {
                this.st='sleeping';
            }
            else{return Err;}
            break;

            case 'get_up':
            if (this.st=='sleeping') {
                this.st='normal';
            }
            else {return Err;}
            break;

            case 'get_hungry':
            if ((this.st=='busy')||(this.st=='sleeping')) {
                this.st='hungry';
            }
            else {return Err;}   
            break;

            case 'eat':
            if (this.st=='hungry') {
                this.st='normal';
            }
            else {return Err;}
            break;

            default:
            return Err;
            
       }
       this.transitions.splice(this.count+1 , this.transitions.length);
       this.transitions.push(this.st);
       this.count++;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.st=this.initial;
        return this.st;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr=[];
        switch (event) {
            case undefined:
            arr.push('normal','busy','hungry','sleeping');
            break;

            case 'study':
            arr.push('normal');
            break;

            case 'get_tired':
            arr.push('busy');
            break;

            case 'get_up':
            arr.push('sleeping');
            break;

            case 'get_hungry':
            arr.push('busy','sleeping');  
            break;

            case 'eat':
            arr.push('hungry');            
            break;

            default:
            
        }
        return arr;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

     if((this.transitions.length<1) || (this.count<1)) {
        return false;
     }       

     this.count--;
     this.st=this.transitions[this.count];
     return true;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ((this.transitions.length<2)||(this.count==(this.transitions.length-1))) {
            return false;
        }

        this.count++;
        this.st=this.transitions[this.count];
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.transitions=['normal'];
        this.count=0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

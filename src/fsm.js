	class FSM {
	  /**
	  * Creates new FSM instance.
	  * @param config
	     */
	    constructor(config) {
	         if (arguments[0]===undefined) {
	            return Err;
	         }
	         this.initial = config.initial;
	         this.st=config.initial;
	         this.states=config.states;
	         this.transitions=[this.initial];
	         this.count=0;
	         this.prevSt=0;
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

	    	for (var key in this.states) {
	    		if	(key===state ) {
	    			this.st = state;}
	    		}
	    		if (this.st!==state) {
	    			return Err;
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
	    	var Errr=0;;

	   			for (var key in this.states[this.st].transitions) {
	   				if  (key===event) {
	   					this.st=this.states[this.st].transitions[key];
	   					Errr++;
	   				}
	   			}
	    		if (Errr!==1) {
	    			return Err;}

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

	      for (var key in this.states) {
	        if (event===undefined) {
	        	arr.push(key);
	        }
	        for (var keykey in this.states[key].transitions){
	        	if (event === keykey) {
	        		arr.push(key);
	        	}
	        }
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
	        if ((this.transitions.length<2)||(this.count===(this.transitions.length-1))) {
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
	        this.transitions=[this.initial];
	        this.count=0;
	    }
	}

	module.exports = FSM;

	/** @Created by Uladzimir Halushka **/

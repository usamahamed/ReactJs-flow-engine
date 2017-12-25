import processor from './processor';
import bodyEvaluator from './bodyEvaluator';
import * as validators from './validators';

export default processor(bodyEvaluator);
export { validators };

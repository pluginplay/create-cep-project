import 'jest-styled-components'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import chaiJestDiff from 'chai-jest-diff'

chai.use(dirtyChai)
chai.use(chaiJestDiff())

global.jestExpect = global.expect
global.expect = chai.expect

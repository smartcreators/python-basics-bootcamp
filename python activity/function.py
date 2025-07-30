#functions program
def greeting():
    print("hello world")
greeting()

#function parameters
name="gayatri"# global variable
def greeting():
    print("hello " +name)
greeting()
#function parameters
def greeting(name): #local variable it is related to these function only so that's why it is known as local variable
    print("hello " +name )
greeting("alexa")
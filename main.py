import numpy as np
import random
import colored
re = colored.attr('reset')
na = colored.bg('0') + "  " + re    #The double space is actually really important
a = colored.bg('1') + "  " + re     #it so happens that double spaces look a lot like squares
b = colored.bg('2') + "  " + re     #in the Linux console, so it serves as a nice trick
c = colored.bg('3') + "  " + re     #to make little colored squares. With this, we'll draw the Flow lines
d = colored.bg('4') + "  " + re
e = colored.bg('5') + "  " + re
f = colored.bg('6') + "  " + re
g = colored.bg('7') + "  " + re
h = colored.bg('8') + "  " + re
i = colored.bg('9') + "  " + re
j = colored.bg('10') + "  " + re
k = colored.bg('11') + "  " + re
l = colored.bg('12') + "  " + re
m = colored.bg('13') + "  " + re
n = colored.bg('14') + "  " + re
o = colored.bg('15') + "  " + re
dic = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o]

n = 8                               #Grid dimension
chain_limit = n-4                   #Minimum line length
iter = 800                          #Number of iterations


def baseMatrix(dim):                #Generates the initial state of the grid with horizontal lines of length 'n'
    A = []                          
    for l in range(dim):
        A.append([])                #Adds 'dim' empty entries in the first level of the list
    for i in range(dim):
        for j in range(dim):
            A[i].append([np.array([i+1,j+1]), dic[i]])              #Fills every level 0 list with the line's informatio:
                                                                    #XY coordinates of each point on the line, as well as a tag indicating the line's color                                                                 #The beginning and end of this list are the line's tails
                                                                    #Selecting a list from 'A' is the same as selecting a whole line
    return A


def edgeSwitch(A):                  #Most important code of this generator: this function extends/shrink two lines whose tails share an edge                                    #First, it analyzes every line:
    sw = False
    for i in range(len(A)):                         #For each row (that is, for every line)...
        if sw == True:
            break
        for k1 in range(-1,1):                      #For every tail of the selected line...
            if sw == True:
                break
            p = A[i][k1][0]                         #where 'p' is the position of the selected tail...
            for j in range(len(A)):                 #For all the other lines...
                if sw == True:
                    break
                if j == i:
                    continue
                if len(A[j]) == chain_limit:        #with length greater than 'chain_limit'...
                    continue
                for k2 in range(-1,1):              #For every tail of the second line...
                    if sw == True:
                        break
                    pprime = A[j][k2][0]            #where'pprime' is the position of the seond line's tail 
                    if np.linalg.norm(p-pprime) == 1.0:                 #If the distance between both positions is exactly one, then they share an edge.
                        n1 = np.random.rand()                           #We flip a coin, and if 'n1' is greater than 0.5...
                        if n1 > 0.5:
                            A[j].pop(k2)                                #We remove the second line's tail...
                            if k1 == -1:
                                A[i].append([pprime,A[i][0][1]])        #... and add it to the first one.
                            elif k1 == 0:
                                A[i].insert(0,[pprime,A[i][0][1]])
                            sw = True
                    else:
                        continue                                        #If 'n1' is not greater than 0.5, we simply continue with another (second) line 
    return A

      
flow = baseMatrix(n)
for step in range(0,iter):
    flow = edgeSwitch(flow)
    random.shuffle(flow)
# print(flow)